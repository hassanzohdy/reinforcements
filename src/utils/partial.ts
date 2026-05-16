/**
 * Pre-bind the first arguments of `fn`. Remaining arguments are
 * passed at call time.
 *
 * @example
 * const greet = (greeting: string, name: string) => `${greeting}, ${name}`;
 * const hello = partial(greet, "Hello");
 *
 * hello("Ada"); // "Hello, Ada"
 */
export default function partial<T extends (...args: any[]) => any>(
  fn: T,
  ...preset: any[]
): (...rest: any[]) => ReturnType<T> {
  return function (this: any, ...rest: any[]) {
    return fn.apply(this, [...preset, ...rest]);
  };
}
