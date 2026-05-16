import { next } from "./_internal";

/** Internal: pick one element. See {@link Random.pick}. */
export default function randomPick<T>(array: readonly T[]): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const index = Math.floor(next() * array.length);

  return array[index];
}
