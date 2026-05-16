/**
 * Typed wrapper around `Object.values`.
 *
 * @example
 * values({ a: 1, b: 2 }); // [1, 2]
 */
export default function values<T extends Record<string, any>>(
  object: T,
): Array<T[keyof T]> {
  return Object.values(object) as Array<T[keyof T]>;
}
