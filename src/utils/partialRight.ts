/**
 * Like {@link partial}, but binds the *trailing* arguments of `fn`.
 *
 * @example
 * const divide = (a: number, b: number) => a / b;
 * const halve = partialRight(divide, 2);
 *
 * halve(10); // 5
 */
export default function partialRight<T extends (...args: any[]) => any>(
  fn: T,
  ...preset: any[]
): (...rest: any[]) => ReturnType<T> {
  return function (this: any, ...rest: any[]) {
    return fn.apply(this, [...rest, ...preset]);
  };
}
