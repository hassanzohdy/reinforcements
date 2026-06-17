/**
 * Reduce `items` to a single value **sequentially**, awaiting the
 * accumulator between steps. Like `Array.prototype.reduce`, but the
 * reducer may be async and each step waits for the previous one to
 * settle.
 *
 * @example
 * const total = await pReduce(
 *   userIds,
 *   async (sum, id) => sum + (await fetchScore(id)),
 *   0,
 * );
 */
export default async function pReduce<T, A>(
  items: readonly T[],
  reducer: (accumulator: A, item: T, index: number) => Promise<A> | A,
  initial: A,
): Promise<A> {
  let accumulator = initial;

  for (let i = 0; i < items.length; i++) {
    accumulator = await reducer(accumulator, items[i], i);
  }

  return accumulator;
}
