/**
 * The inverse of `zip`: turn an array of tuples back into a tuple of
 * arrays grouped by position. The number of output arrays matches the
 * longest row; missing positions are filled with `undefined`.
 *
 * @example
 * unzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]
 */
export default function unzip<T>(array: readonly T[][]): (T | undefined)[][] {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  const length = array.reduce(
    (max, row) => Math.max(max, Array.isArray(row) ? row.length : 0),
    0,
  );

  const result: (T | undefined)[][] = [];

  for (let i = 0; i < length; i++) {
    result.push(array.map(row => (Array.isArray(row) ? row[i] : undefined)));
  }

  return result;
}
