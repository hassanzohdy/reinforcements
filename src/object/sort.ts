import isPlainObject from "./isPlainObject";

/**
 * Return a new object with keys sorted alphabetically. When
 * `recursive` is `true` (default), nested plain objects are sorted as
 * well. Arrays are returned as-is.
 *
 * For sorting arrays of objects by key, use `sortBy` from
 * `@mongez/collections`.
 *
 * @example
 * sort({ b: 1, a: 2 }); // { a: 2, b: 1 }
 */
export default function sort<T>(object: T, recursive = true): T {
  if (!isPlainObject(object)) {
    return object;
  }

  const sortedObject: Record<string, any> = {};
  const sortedKeys = Object.keys(object as object).sort();

  for (const key of sortedKeys) {
    const value = (object as any)[key];

    sortedObject[key] = recursive ? sort(value, true) : value;
  }

  return sortedObject as T;
}
