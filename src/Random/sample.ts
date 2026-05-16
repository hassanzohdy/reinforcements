import { next } from "./_internal";

/** Internal: sample `n` unique elements. See {@link Random.sample}. */
export default function randomSample<T>(array: readonly T[], n: number): T[] {
  if (!Array.isArray(array) || array.length === 0 || n <= 0) {
    return [];
  }

  const take = Math.min(n, array.length);
  const pool = array.slice();

  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(next() * (pool.length - i));

    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, take);
}
