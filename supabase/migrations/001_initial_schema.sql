-- ============================================================
-- RealBet VIP Hub — Initial Database Schema
-- ============================================================

-- 1. Profiles (extends auth.users)
-- ---------------------------------------------------------
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  twitter_handle TEXT,
  twitter_id TEXT UNIQUE,
  avatar_url TEXT,
  display_name TEXT,
  tier TEXT NOT NULL DEFAULT 'Bronze'
    CHECK (tier IN ('Bronze','Silver','Gold','Platinum','Diamond')),
  points_balance BIGINT NOT NULL DEFAULT 0,
  streak_current INTEGER NOT NULL DEFAULT 0,
  streak_last_checkin DATE,
  nft_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.0,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES profiles(id),
  wallet_address TEXT,
  account_linked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Points Transactions (append-only ledger)
-- ---------------------------------------------------------
CREATE TABLE points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN (
    'wager','task','mystery_box','referral','switch_bonus',
    'daily_streak','arena','bonus_api','weekly_draw','adjustment'
  )),
  reference_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_points_tx_user ON points_transactions(user_id);
CREATE INDEX idx_points_tx_created ON points_transactions(created_at);
CREATE INDEX idx_points_tx_user_reason ON points_transactions(user_id, reason);

-- 3. Bonuses
-- ---------------------------------------------------------
CREATE TABLE bonuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bonus_type TEXT NOT NULL,
  amount_points BIGINT NOT NULL DEFAULT 0,
  amount_usd NUMERIC(10,2) DEFAULT 0,
  external_reference TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','granted','failed','revoked')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  granted_at TIMESTAMPTZ
);

CREATE INDEX idx_bonuses_user ON bonuses(user_id);
CREATE INDEX idx_bonuses_status ON bonuses(status);

-- ============================================================
-- Triggers
-- ============================================================

-- 4a. Sync points_balance on profiles after each transaction
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION update_points_balance()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET points_balance = points_balance + NEW.amount,
      updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_points_transaction
  AFTER INSERT ON points_transactions
  FOR EACH ROW EXECUTE FUNCTION update_points_balance();

-- 4b. Auto-update tier when points_balance changes
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION update_user_tier()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tier := CASE
    WHEN NEW.points_balance >= 75000 THEN 'Diamond'
    WHEN NEW.points_balance >= 50000 THEN 'Platinum'
    WHEN NEW.points_balance >= 25000 THEN 'Gold'
    WHEN NEW.points_balance >= 10000 THEN 'Silver'
    ELSE 'Bronze'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_tier
  BEFORE UPDATE OF points_balance ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_user_tier();

-- 4c. Auto-create profile on user signup
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (
    id, twitter_handle, twitter_id, avatar_url, display_name, referral_code
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'provider_id',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'full_name',
    UPPER(SUBSTR(MD5(NEW.id::text), 1, 4) || '-' || SUBSTR(MD5(random()::text), 1, 4))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonuses ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read (needed for leaderboard), users can update own row
CREATE POLICY "Profiles are publicly readable"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Points transactions: users can read own, service role inserts
CREATE POLICY "Users can view own transactions"
  ON points_transactions FOR SELECT USING (auth.uid() = user_id);

-- Bonuses: users can read own, service role inserts
CREATE POLICY "Users can view own bonuses"
  ON bonuses FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- RPC Functions
-- ============================================================

-- Leaderboard: ranked profiles by effective points (balance * multiplier)
CREATE OR REPLACE FUNCTION get_leaderboard(p_limit INTEGER DEFAULT 50)
RETURNS TABLE (
  rank BIGINT,
  id UUID,
  twitter_handle TEXT,
  display_name TEXT,
  avatar_url TEXT,
  tier TEXT,
  points_balance BIGINT,
  nft_multiplier NUMERIC,
  effective_points NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROW_NUMBER() OVER (ORDER BY p.points_balance * p.nft_multiplier DESC) AS rank,
    p.id,
    p.twitter_handle,
    p.display_name,
    p.avatar_url,
    p.tier,
    p.points_balance,
    p.nft_multiplier,
    (p.points_balance * p.nft_multiplier) AS effective_points
  FROM profiles p
  ORDER BY effective_points DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get a single user's rank
CREATE OR REPLACE FUNCTION get_user_rank(p_user_id UUID)
RETURNS BIGINT AS $$
DECLARE
  user_rank BIGINT;
BEGIN
  SELECT rank INTO user_rank
  FROM (
    SELECT
      p.id,
      ROW_NUMBER() OVER (ORDER BY p.points_balance * p.nft_multiplier DESC) AS rank
    FROM profiles p
  ) ranked
  WHERE ranked.id = p_user_id;

  RETURN user_rank;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
