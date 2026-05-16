import { ALPHANUMERIC, next } from "./_internal";

/** Internal: random alphanumeric string. See {@link Random.string}. */
export default function randomString(length = 32): string {
  let text = "";

  for (let i = 0; i < length; i++) {
    text += ALPHANUMERIC.charAt(Math.floor(next() * ALPHANUMERIC.length));
  }

  return text;
}
