/**
 * Round number with given precision
 *
 * @param   Number value
 * @param   Number precision
 * @returns Number
 */
export default function round(value: number, precision: number = 2): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}
