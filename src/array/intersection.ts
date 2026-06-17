/**
 * Return the unique values present in **every** given array (set
 * intersection). Order follows the first array; values are compared by
 * `SameValueZero` (`Set` membership).
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4], [3, 2]); // [2, 3]
 */
export default function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }

  const [first, ...rest] = arrays;

  if (!Array.isArray(first)) {
    return [];
  }

  const restSets = rest.map(
    array => new Set(Array.isArray(array) ? array : []),
  );
  const seen = new Set<T>();
  const result: T[] = [];

  for (const item of first) {
    if (seen.has(item)) {
      continue;
    }

    if (restSets.every(set => set.has(item))) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
