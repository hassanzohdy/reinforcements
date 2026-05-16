type Resolver<T> = (value: T) => void;
type Rejecter = (reason: unknown) => void;

/**
 * Async-aware debounce: every call returns a promise. Only the final
 * call within `wait` ms actually invokes `fn`; earlier calls' promises
 * resolve to the same result.
 *
 * @example
 * const search = debounceAsync(
 *   (q: string) => fetch(q).then(r => r.json()),
 *   250,
 * );
 *
 * const a = search("a");
 * const b = search("ab"); // a resolves with the same result as b
 */
export default function debounceAsync<
  T extends (...args: any[]) => Promise<any>,
>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
  type Result = Awaited<ReturnType<T>>;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let pendingResolvers: Array<Resolver<Result>> = [];
  let pendingRejecters: Array<Rejecter> = [];
  let pendingArgs: Parameters<T> | undefined;

  function flush(thisArg: any): void {
    timeoutId = undefined;

    const resolvers = pendingResolvers;
    const rejecters = pendingRejecters;
    const args = pendingArgs as Parameters<T>;

    pendingResolvers = [];
    pendingRejecters = [];

    Promise.resolve(fn.apply(thisArg, args))
      .then((value: Result) => {
        for (const resolve of resolvers) {
          resolve(value);
        }
      })
      .catch((error: unknown) => {
        for (const reject of rejecters) {
          reject(error);
        }
      });
  }

  return function (this: any, ...args: Parameters<T>): Promise<Result> {
    pendingArgs = args;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    return new Promise<Result>((resolve, reject) => {
      pendingResolvers.push(resolve);
      pendingRejecters.push(reject);

      timeoutId = setTimeout(() => flush(this), wait);
    });
  };
}
