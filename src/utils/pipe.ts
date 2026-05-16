/**
 * Pipe a value through a sequence of unary functions, left-to-right.
 *
 * @example
 * pipe(2, n => n + 1, n => n * 10); // 30
 */
export default function pipe<A>(value: A): A;
export default function pipe<A, B>(value: A, fn1: (a: A) => B): B;
export default function pipe<A, B, C>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
): C;
export default function pipe<A, B, C, D>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
): D;
export default function pipe<A, B, C, D, E>(
  value: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
): E;
export default function pipe(
  value: any,
  ...fns: Array<(input: any) => any>
): any;
export default function pipe(
  value: any,
  ...fns: Array<(input: any) => any>
): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}
