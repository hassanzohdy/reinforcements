/**
 * Sleep for `ms` milliseconds, then resolve with `value` (or
 * `undefined`).
 *
 * @example
 * await sleep(100);
 * const x = await sleep(50, "ready");
 */
export default function sleep(ms: number): Promise<void>;
export default function sleep<T>(ms: number, value: T): Promise<T>;
export default function sleep(ms: number, value?: any): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}
