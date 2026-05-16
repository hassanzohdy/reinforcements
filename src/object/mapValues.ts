/**
 * Map each value of `object` through `transform`, returning a new
 * object with the same keys.
 *
 * @example
 * mapValues({ a: 1, b: 2 }, v => v * 2); // { a: 2, b: 4 }
 */
export default function mapValues<T extends Record<string, any>, U>(
  object: T,
  transform: (value: T[keyof T], key: keyof T & string, object: T) => U,
): Record<keyof T & string, U> {
  const result = {} as Record<keyof T & string, U>;

  for (const key of Object.keys(object) as Array<keyof T & string>) {
    result[key] = transform(object[key], key, object);
  }

  return result;
}
