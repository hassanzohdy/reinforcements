/**
 * Round number with given precision
 */
export default function round(value: number, precision = 2): number {
  const multiplier = Math.pow(10, precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}
