import pMap from "./pMap";

export type PFilterOptions = {
  /** Maximum concurrent predicate evaluations. Default: `Infinity`. */
  concurrency?: number;
};

/**
 * Like `Array.prototype.filter`, but the predicate may be async.
 * Items are evaluated with bounded concurrency.
 *
 * @example
 * const reachable = await pFilter(urls, u => ping(u), { concurrency: 4 });
 */
export default async function pFilter<T>(
  items: readonly T[],
  predicate: (item: T, index: number) => Promise<boolean> | boolean,
  options: PFilterOptions = {},
): Promise<T[]> {
  const flags = await pMap(items, predicate, options);

  return items.filter((_, index) => flags[index]);
}
