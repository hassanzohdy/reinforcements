/**
 * Concatenate all given arrays and return the unique values, preserving
 * first-seen order (set union). Values are compared by `SameValueZero`.
 *
 * @example
 * union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
 */
export default function union<T>(...arrays: T[][]): T[] {
  const seen = new Set<T>();
  const result: T[] = [];

  for (const array of arrays) {
    if (!Array.isArray(array)) {
      continue;
    }

    for (const item of array) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }

  return result;
}
