/**
 * Map an object into an array by applying `callback` to each entry.
 *
 * @example
 * map({ a: 1, b: 2 }, (key, value) => `${key}=${value}`);
 * // ["a=1", "b=2"]
 */
export default function map<T extends Record<string, any>, U>(
  object: T,
  callback: (key: keyof T & string, value: T[keyof T], object: T) => U,
): U[] {
  return Object.keys(object).map(key =>
    callback(
      key as keyof T & string,
      object[key as keyof T],
      object,
    ),
  );
}
