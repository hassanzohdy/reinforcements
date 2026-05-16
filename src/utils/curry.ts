/**
 * Convert an n-ary function into a sequence of unary functions.
 *
 * @example
 * const add = curry((a: number, b: number, c: number) => a + b + c);
 *
 * add(1)(2)(3); // 6
 * add(1, 2)(3); // 6
 * add(1, 2, 3); // 6
 */
export default function curry<T extends (...args: any[]) => any>(fn: T): any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return (...more: any[]) => curried.apply(this, [...args, ...more]);
  };
}
