import { cryptoRef, next } from "./_internal";

const HEX_BYTE = 2;

/** Internal: crypto-backed hex token. See {@link Random.token}. */
export default function randomToken(bytes = 16): string {
  const buffer = new Uint8Array(bytes);

  if (typeof cryptoRef.getRandomValues === "function") {
    cryptoRef.getRandomValues(buffer);
  } else {
    for (let i = 0; i < bytes; i++) {
      buffer[i] = Math.floor(next() * 256);
    }
  }

  return Array.from(buffer, byte =>
    byte.toString(16).padStart(HEX_BYTE, "0"),
  ).join("");
}
