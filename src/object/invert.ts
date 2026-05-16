/**
 * Return a new object where each key/value pair is swapped. Values
 * become keys (coerced to strings); collisions resolve to the
 * last-seen pair.
 *
 * @example
 * invert({ a: 1, b: 2 }); // { "1": "a", "2": "b" }
 */
export default function invert<
  K extends string,
  V extends string | number | symbol,
>(object: Record<K, V>): Record<string, K> {
  const result: Record<string, K> = {};

  for (const key of Object.keys(object) as K[]) {
    const value = String(object[key]);

    result[value] = key;
  }

  return result;
}
