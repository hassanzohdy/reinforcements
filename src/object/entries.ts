/**
 * Typed wrapper around `Object.entries` that preserves key types when
 * possible.
 *
 * @example
 * entries({ a: 1, b: 2 }); // [["a", 1], ["b", 2]]
 */
export default function entries<T extends Record<string, any>>(
  object: T,
): Array<[keyof T & string, T[keyof T]]> {
  return Object.entries(object) as Array<[keyof T & string, T[keyof T]]>;
}
