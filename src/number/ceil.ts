/**
 * Ceil `value` to the given number of decimal places.
 *
 * @example
 * ceil(1.01, 1); // 1.1
 */
export default function ceil(value: number, precision = 0): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.ceil(value * multiplier) / multiplier;
}
