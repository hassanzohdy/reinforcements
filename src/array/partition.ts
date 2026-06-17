/**
 * Split `array` into two groups by `predicate`: `[pass, fail]`. Items
 * for which `predicate` returns truthy go in the first array, the rest
 * in the second. Single pass, original order preserved.
 *
 * @example
 * partition([1, 2, 3, 4], n => n % 2 === 0); // [[2, 4], [1, 3]]
 * const [active, archived] = partition(users, u => u.active);
 */
export default function partition<T>(
  array: readonly T[],
  predicate: (item: T, index: number) => unknown,
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];

  if (!Array.isArray(array)) {
    return [pass, fail];
  }

  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      pass.push(array[i]);
    } else {
      fail.push(array[i]);
    }
  }

  return [pass, fail];
}
