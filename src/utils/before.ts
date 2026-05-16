/**
 * Return a function that may invoke `fn` up to `n` times. After the
 * `n`-th call, further invocations return the result of the last
 * call.
 *
 * @example
 * const tryConnect = before(3, () => connect());
 *
 * tryConnect();
 * tryConnect();
 * tryConnect();
 * tryConnect(); // returns the third call's result, doesn't invoke
 */
export default function before<T extends (...args: any[]) => any>(
  n: number,
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let count = 0;
  let result: ReturnType<T> | undefined;

  return function (this: any, ...args: Parameters<T>) {
    if (count < n) {
      count++;
      result = fn.apply(this, args);
    }

    return result;
  };
}
