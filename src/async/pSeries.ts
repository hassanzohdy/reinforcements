/**
 * Map `items` through `mapper` sequentially. Stops at the first
 * thrown error.
 *
 * @example
 * const results = await pSeries(tasks, task => runTask(task));
 */
export default async function pSeries<T, U>(
  items: readonly T[],
  mapper: (item: T, index: number) => Promise<U> | U,
): Promise<U[]> {
  const results: U[] = [];

  for (let i = 0; i < items.length; i++) {
    const value = await mapper(items[i], i);

    results.push(value);
  }

  return results;
}
