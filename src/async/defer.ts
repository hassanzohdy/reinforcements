export type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

/**
 * Create a deferred — an externally-resolvable promise.
 *
 * @example
 * const ready = defer<string>();
 *
 * setTimeout(() => ready.resolve("done"), 100);
 *
 * await ready.promise; // "done"
 */
export default function defer<T = void>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
