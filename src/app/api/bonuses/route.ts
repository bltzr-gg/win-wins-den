import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { verifyHmac } from "@/lib/hmac";
import { z } from "zod";

const BonusRequestSchema = z.object({
  twitter_handle: z.string().min(1),
  amount: z.number().int().positive(),
  bonus_type: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * POST /api/bonuses — Grant a bonus to a user
 *
 * Headers:
 *   X-Signature: HMAC-SHA256 hex digest
 *   X-Timestamp: Unix seconds
 *
 * Body:
 *   { twitter_handle, amount, bonus_type, metadata? }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.BONUS_API_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured: missing BONUS_API_SECRET" },
      { status: 500 }
    );
  }

  // Read and verify HMAC signature
  const body = await request.text();
  const signature = request.headers.get("x-signature");
  const timestamp = request.headers.get("x-timestamp");

  const hmacResult = verifyHmac(signature, timestamp, body, secret);
  if (!hmacResult.valid) {
    return NextResponse.json({ error: hmacResult.error }, { status: 401 });
  }

  // Parse and validate body
  let parsed;
  try {
    parsed = BonusRequestSchema.parse(JSON.parse(body));
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // Look up user by twitter handle
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("twitter_handle", parsed.twitter_handle)
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: `User not found: @${parsed.twitter_handle}` },
      { status: 404 }
    );
  }

  // Create bonus record
  const { data: bonus, error: bonusError } = await supabase
    .from("bonuses")
    .insert({
      user_id: profile.id,
      bonus_type: parsed.bonus_type,
      amount_points: parsed.amount,
      status: "pending",
      metadata: parsed.metadata ?? {},
    })
    .select("id")
    .single();

  if (bonusError || !bonus) {
    return NextResponse.json(
      { error: "Failed to create bonus" },
      { status: 500 }
    );
  }

  // Credit points via the ledger
  const { error: txError } = await supabase
    .from("points_transactions")
    .insert({
      user_id: profile.id,
      amount: parsed.amount,
      reason: "bonus_api",
      reference_id: bonus.id,
      metadata: { bonus_type: parsed.bonus_type, ...parsed.metadata },
    });

  if (txError) {
    // Mark bonus as failed
    await supabase
      .from("bonuses")
      .update({ status: "failed" })
      .eq("id", bonus.id);

    return NextResponse.json(
      { error: "Failed to credit points" },
      { status: 500 }
    );
  }

  // TODO: Chain to external npm package API here
  // const externalResult = await externalApi.grantBonus({ ... });
  // const externalReference = externalResult.id;

  // Mark bonus as granted
  await supabase
    .from("bonuses")
    .update({
      status: "granted",
      granted_at: new Date().toISOString(),
      // external_reference: externalReference,
    })
    .eq("id", bonus.id);

  return NextResponse.json({
    bonus_id: bonus.id,
    points_awarded: parsed.amount,
    user_id: profile.id,
  });
}

/**
 * GET /api/bonuses?twitter_handle=xxx — Get bonus history for a user
 *
 * Headers:
 *   X-Signature: HMAC-SHA256 hex digest
 *   X-Timestamp: Unix seconds
 */
export async function GET(request: NextRequest) {
  const secret = process.env.BONUS_API_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured: missing BONUS_API_SECRET" },
      { status: 500 }
    );
  }

  // Verify HMAC (for GET, body is empty string)
  const signature = request.headers.get("x-signature");
  const timestamp = request.headers.get("x-timestamp");

  const hmacResult = verifyHmac(signature, timestamp, "", secret);
  if (!hmacResult.valid) {
    return NextResponse.json({ error: hmacResult.error }, { status: 401 });
  }

  const twitterHandle = request.nextUrl.searchParams.get("twitter_handle");
  if (!twitterHandle) {
    return NextResponse.json(
      { error: "Missing twitter_handle query parameter" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("twitter_handle", twitterHandle)
    .single();

  if (!profile) {
    return NextResponse.json(
      { error: `User not found: @${twitterHandle}` },
      { status: 404 }
    );
  }

  const { data: bonuses, error } = await supabase
    .from("bonuses")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch bonuses" },
      { status: 500 }
    );
  }

  return NextResponse.json({ bonuses });
}
