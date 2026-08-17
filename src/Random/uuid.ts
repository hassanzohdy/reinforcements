import { cryptoBytes, cryptoRef } from "./_internal";

const VERSION_OFFSET = 6;
const VARIANT_OFFSET = 8;
const HEX_BYTE = 2;

/**
 * Internal: RFC 4122 v4 UUID. See {@link Random.uuid}.
 *
 * Uses `crypto.randomUUID` when available, otherwise
 * `crypto.getRandomValues`. Throws when the runtime exposes no CSPRNG —
 * uuids are never drawn from the seedable PRNG.
 */
export default function randomUuid(): string {
  if (typeof cryptoRef.randomUUID === "function") {
    return cryptoRef.randomUUID();
  }

  const bytes = cryptoBytes(16);

  // Set version (4) and variant (10xx) bits.
  bytes[VERSION_OFFSET] = (bytes[VERSION_OFFSET] & 0x0f) | 0x40;
  bytes[VARIANT_OFFSET] = (bytes[VARIANT_OFFSET] & 0x3f) | 0x80;

  const hex = Array.from(bytes, byte =>
    byte.toString(16).padStart(HEX_BYTE, "0"),
  ).join("");

  return (
    hex.slice(0, 8) +
    "-" +
    hex.slice(8, 12) +
    "-" +
    hex.slice(12, 16) +
    "-" +
    hex.slice(16, 20) +
    "-" +
    hex.slice(20)
  );
}
