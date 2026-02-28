# Auth Gate & Mock User Data Removal

**Date:** 2026-02-28

## Problem

The app currently shows mock data for the authenticated user (points: 12450, rank: 42, name: "DEGEN_WHALE", referral code: "DEGEN-7X42", streak: 4, tier: "Gold", nftMultiplier: 1.1) to all visitors regardless of auth state. This misrepresents the product and is misleading to logged-out users.

## Goal

- Never show fake user-specific data to unauthenticated visitors.
- Blur/obscure personalised sections with a sign-in CTA instead.
- Protect the Profile page behind auth entirely.

## Decisions

- **Dashboard:** blur user-specific sections, show a sign-in overlay. Don't invent neutral states (no streak=0, no fake ranks).
- **Profile page:** redirect to `/login` if not authenticated.
- **No middleware:** component-level guards are sufficient at this scale.

## AuthGate Component

A reusable `<AuthGate>` wrapper in `src/components/AuthGate.tsx`:

- **Loading:** render children at low opacity with a subtle pulse (no layout shift).
- **Unauthenticated:** render children blurred (`blur-sm`) + `pointer-events-none`, with an absolute overlay containing a lock icon, short copy ("Sign in to view your stats"), and a "Sign in with X" button that calls `signIn()` from `useAuth()`.
- **Authenticated:** render children normally.

The overlay uses `backdrop-blur-[2px]` and a semi-transparent background so the blurred content is visible but unreadable underneath.

## Dashboard Changes (`src/views/Dashboard.tsx`)

Wrap the following with `<AuthGate>`:

| Section | Scope of blur |
|---|---|
| `ProfileReferralPanel` | Entire component |
| `PointsBreakdown` | Entire component |
| `DailyMysteryBoxCard` | Entire component |
| Arena stats row (Win Rate, Arena Multi, 7d Net) | Just the stats `<div>` inside `ArenaCard` |
| `BadgesPreview` | Entire component |

Sections that remain visible to all:
- `AnnouncementBanner`
- `GettingStarted` (step 1 CTA changes to "Create Account" → `/login` for logged-out)
- `SwitchBonusCard`

## Data Layer Changes

### `src/hooks/use-dashboard-data.ts`
Remove all `?? <mock>` fallbacks for user-derived fields. Return `null` for:
- `points`, `rank`, `streak`, `tier`, `nftMultiplier`, `displayName`, `referralCode`

These fields become `null` when unauthenticated. Components behind `<AuthGate>` never render when `null`, so no null-handling is needed in the UI.

### `src/views/Profile.tsx`
- Remove `defaultPointsBreakdown` hardcoded array.
- Remove all `?? <mock>` fallbacks.
- Add auth guard at top of component: if `!user && !loading`, call `router.replace("/login")`.

## Files Changed

- `src/components/AuthGate.tsx` — new component
- `src/views/Dashboard.tsx` — wrap sections, update GettingStarted step 1
- `src/hooks/use-dashboard-data.ts` — strip mock fallbacks
- `src/views/Profile.tsx` — auth guard + strip mock fallbacks
