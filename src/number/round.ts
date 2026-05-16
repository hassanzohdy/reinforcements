/**
 * Round `value` to the given number of decimal places (banker's-style
 * `Math.round`).
 *
 * @example
 * round(1.235, 2); // 1.24
 * round(1.5); // 2
 */
export default function round(value: number, precision = 2): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
