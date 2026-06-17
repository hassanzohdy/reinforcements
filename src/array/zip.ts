/**
 * Combine several arrays into an array of tuples, pairing values by
 * index. The result length matches the **longest** input; missing
 * positions are filled with `undefined`.
 *
 * @example
 * zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
 * zip([1], ["a", "b"]);    // [[1, "a"], [undefined, "b"]]
 */
export default function zip<T extends any[][]>(
  ...arrays: T
): Array<{ [K in keyof T]: T[K] extends (infer U)[] ? U | undefined : never }> {
  const length = arrays.reduce(
    (max, array) => Math.max(max, Array.isArray(array) ? array.length : 0),
    0,
  );

  const result: any[] = [];

  for (let i = 0; i < length; i++) {
    result.push(
      arrays.map(array => (Array.isArray(array) ? array[i] : undefined)),
    );
  }

  return result as any;
}
