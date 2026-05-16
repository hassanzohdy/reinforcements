/**
 * Floor `value` to the given number of decimal places.
 *
 * @example
 * floor(1.99, 1); // 1.9
 */
export default function floor(value: number, precision = 0): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}
