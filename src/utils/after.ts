/**
 * Return a function that only invokes `fn` after it has been called
 * at least `n` times. The first `n - 1` calls return `undefined`.
 *
 * @example
 * const onAllDone = after(3, () => render());
 *
 * onAllDone();
 * onAllDone();
 * onAllDone(); // render() runs on the third call
 */
export default function after<T extends (...args: any[]) => any>(
  n: number,
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let count = 0;

  return function (this: any, ...args: Parameters<T>) {
    count++;

    if (count >= n) {
      return fn.apply(this, args);
    }

    return undefined;
  };
}
