import { createHmac, timingSafeEqual } from "crypto";

const MAX_TIMESTAMP_DRIFT_SECONDS = 300; // 5 minutes

export interface HmacVerifyResult {
  valid: boolean;
  error?: string;
}

/**
 * Verify an HMAC-SHA256 signed request.
 *
 * The caller computes:
 *   HMAC-SHA256(secret, timestamp + "." + body)
 * and sends:
 *   X-Signature: <hex digest>
 *   X-Timestamp: <unix seconds>
 */
export function verifyHmac(
  signature: string | null,
  timestamp: string | null,
  body: string,
  secret: string
): HmacVerifyResult {
  if (!signature || !timestamp) {
    return { valid: false, error: "Missing X-Signature or X-Timestamp header" };
  }

  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) {
    return { valid: false, error: "Invalid X-Timestamp" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > MAX_TIMESTAMP_DRIFT_SECONDS) {
    return { valid: false, error: "Request timestamp outside 5-minute window" };
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (sigBuffer.length !== expectedBuffer.length) {
    return { valid: false, error: "Invalid signature" };
  }

  if (!timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: "Invalid signature" };
  }

  return { valid: true };
}
