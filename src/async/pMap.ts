export type PMapOptions = {
  /** Maximum concurrent invocations. Default: `Infinity`. */
  concurrency?: number;
  /** Abort on first error. Default: `true`. */
  stopOnError?: boolean;
};

export type PMapper<T, U> = (item: T, index: number) => Promise<U> | U;

/**
 * Map `items` through `mapper` with bounded concurrency. Preserves the
 * input order in the output.
 *
 * @example
 * const docs = await pMap(urls, url => fetch(url), { concurrency: 5 });
 */
export default function pMap<T, U>(
  items: readonly T[],
  mapper: PMapper<T, U>,
  options: PMapOptions = {},
): Promise<U[]> {
  const concurrency = options.concurrency ?? Infinity;
  const stopOnError = options.stopOnError ?? true;

  if (items.length === 0) {
    return Promise.resolve([]);
  }

  const results: U[] = new Array(items.length);
  const state = {
    nextIndex: 0,
    active: 0,
    firstError: undefined as unknown,
    rejected: false,
  };

  return new Promise<U[]>((resolve, reject) => {
    function runNext(): void {
      if (state.rejected) {
        return;
      }

      while (state.active < concurrency && state.nextIndex < items.length) {
        const index = state.nextIndex++;

        state.active++;

        Promise.resolve(mapper(items[index], index))
          .then(value => onItemFulfilled(value, index))
          .catch(error => onItemRejected(error));
      }
    }

    function onItemFulfilled(value: U, index: number): void {
      results[index] = value;
      state.active--;

      if (state.rejected) {
        return;
      }

      const isDone = state.active === 0 && state.nextIndex >= items.length;

      if (isDone) {
        if (state.firstError !== undefined) {
          reject(state.firstError);

          return;
        }

        resolve(results);

        return;
      }

      runNext();
    }

    function onItemRejected(error: unknown): void {
      state.firstError ??= error;
      state.active--;

      if (stopOnError) {
        state.rejected = true;
        reject(error);

        return;
      }

      const isDone = state.active === 0 && state.nextIndex >= items.length;

      if (isDone) {
        reject(state.firstError);

        return;
      }

      runNext();
    }

    runNext();
  });
}
