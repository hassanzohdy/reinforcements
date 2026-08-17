import { cryptoBytes } from "./_internal";

const HEX_BYTE = 2;

/**
 * Internal: crypto-backed hex token. See {@link Random.token}.
 *
 * Throws when the runtime exposes no CSPRNG — tokens are never drawn
 * from the seedable PRNG.
 */
export default function randomToken(bytes = 16): string {
  const buffer = cryptoBytes(bytes);

  return Array.from(buffer, byte =>
    byte.toString(16).padStart(HEX_BYTE, "0"),
  ).join("");
}
