import { ALPHANUMERIC, cryptoStringOf } from "./_internal";

/**
 * Internal: random alphanumeric string. See {@link Random.string}.
 *
 * Token-shaped, so it is CSPRNG-backed and never seedable.
 */
export default function randomString(length = 32): string {
  return cryptoStringOf(ALPHANUMERIC, length);
}
