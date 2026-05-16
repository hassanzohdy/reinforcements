/**
 * Constrain `value` to the inclusive range `[min, max]`.
 *
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(-3, 0, 10); // 0
 */
export default function clamp(
  value: number,
  min: number,
  max: number,
): number {
  if (min > max) {
    [min, max] = [max, min];
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}
