/**
 * Typed wrapper around `Object.fromEntries`.
 *
 * @example
 * fromEntries([["a", 1], ["b", 2]]); // { a: 1, b: 2 }
 */
export default function fromEntries<K extends string, V>(
  entries: Iterable<readonly [K, V]>,
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}
