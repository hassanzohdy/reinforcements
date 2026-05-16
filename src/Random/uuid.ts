import { cryptoRef, next } from "./_internal";

const VERSION_OFFSET = 6;
const VARIANT_OFFSET = 8;
const HEX_BYTE = 2;

/** Internal: RFC 4122 v4 UUID. See {@link Random.uuid}. */
export default function randomUuid(): string {
  if (typeof cryptoRef.randomUUID === "function") {
    return cryptoRef.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (typeof cryptoRef.getRandomValues === "function") {
    cryptoRef.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) {
      bytes[i] = Math.floor(next() * 256);
    }
  }

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
