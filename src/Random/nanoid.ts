import { URL_SAFE, cryptoStringOf } from "./_internal";

/**
 * Internal: URL-safe random id. See {@link Random.nanoid}.
 *
 * Id-shaped, so it is CSPRNG-backed and never seedable.
 */
export default function randomNanoid(size = 21): string {
  return cryptoStringOf(URL_SAFE, size);
}
