/**
 * Return the unique values from `array` that do not appear in any of the
 * `others` (set difference). Order follows `array`; values are compared
 * by `SameValueZero`.
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]); // [1, 3]
 * difference([1, 2, 3], [2], [3]);  // [1]
 */
export default function difference<T>(array: T[], ...others: T[][]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const exclude = new Set<T>();

  for (const other of others) {
    if (!Array.isArray(other)) {
      continue;
    }

    for (const item of other) {
      exclude.add(item);
    }
  }

  const seen = new Set<T>();
  const result: T[] = [];

  for (const item of array) {
    if (exclude.has(item) || seen.has(item)) {
      continue;
    }

    seen.add(item);
    result.push(item);
  }

  return result;
}
