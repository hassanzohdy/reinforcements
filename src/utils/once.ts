/**
 * Wrap `fn` so it can be called any number of times, but only the
 * first call actually invokes the underlying function. Subsequent
 * calls return the cached result.
 *
 * @example
 * const init = once(() => expensiveSetup());
 *
 * init();
 * init();
 * init(); // setup runs only on the first call
 */
export default function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }

    return result;
  } as T;
}
