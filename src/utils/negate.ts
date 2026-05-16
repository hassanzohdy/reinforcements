/**
 * Return a predicate that inverts the truthiness of `predicate`.
 *
 * @example
 * const isEven = (n: number) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // true
 */
export default function negate<T extends (...args: any[]) => any>(
  predicate: T,
): (...args: Parameters<T>) => boolean {
  return function (this: any, ...args: Parameters<T>) {
    return !predicate.apply(this, args);
  };
}
