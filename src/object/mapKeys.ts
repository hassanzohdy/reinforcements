/**
 * Map each key of `object` through `transform`, returning a new
 * object with the renamed keys. Collisions resolve to the last-seen
 * value.
 *
 * @example
 * mapKeys({ a: 1, b: 2 }, k => k.toUpperCase()); // { A: 1, B: 2 }
 */
export default function mapKeys<T extends Record<string, any>>(
  object: T,
  transform: (key: keyof T & string, value: T[keyof T], object: T) => string,
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};

  for (const key of Object.keys(object) as Array<keyof T & string>) {
    const newKey = transform(key, object[key], object);

    result[newKey] = object[key];
  }

  return result;
}
