import { next } from "./_internal";

/** Internal: random integer in `[min, max]`. See {@link Random.int}. */
export default function randomInt(min = 1, max = 9999999): number {
  return Math.floor(next() * (max - min + 1)) + min;
}
