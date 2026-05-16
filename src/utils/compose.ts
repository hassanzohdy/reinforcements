/**
 * Right-to-left function composition. `compose(f, g, h)(x)` is
 * equivalent to `f(g(h(x)))`.
 *
 * @example
 * const shout = compose(
 *   (s: string) => s + "!",
 *   (s: string) => s.toUpperCase(),
 * );
 *
 * shout("hi"); // "HI!"
 */
export default function compose<A, B>(fn1: (a: A) => B): (a: A) => B;
export default function compose<A, B, C>(
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => C;
export default function compose<A, B, C, D>(
  fn3: (c: C) => D,
  fn2: (b: B) => C,
  fn1: (a: A) => B,
): (a: A) => D;
export default function compose(
  ...fns: Array<(input: any) => any>
): (input: any) => any;
export default function compose(
  ...fns: Array<(input: any) => any>
): (input: any) => any {
  return (input: any) => fns.reduceRight((acc, fn) => fn(acc), input);
}
