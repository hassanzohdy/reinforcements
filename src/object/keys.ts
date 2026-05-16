/**
 * Typed wrapper around `Object.keys`.
 *
 * @example
 * keys({ a: 1, b: 2 }); // ["a", "b"]  typed as Array<"a" | "b">
 */
export default function keys<T extends Record<string, any>>(
  object: T,
): Array<keyof T & string> {
  return Object.keys(object) as Array<keyof T & string>;
}
