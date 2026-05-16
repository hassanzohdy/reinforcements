import { URL_SAFE, next } from "./_internal";

/** Internal: URL-safe random id. See {@link Random.nanoid}. */
export default function randomNanoid(size = 21): string {
  let text = "";

  for (let i = 0; i < size; i++) {
    text += URL_SAFE.charAt(Math.floor(next() * URL_SAFE.length));
  }

  return text;
}
