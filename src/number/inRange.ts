export type InRangeOptions = {
  /** Treat `max` as inclusive. Default: `true`. */
  inclusive?: boolean;
};

/**
 * Return `true` when `value` is between `min` and `max`. `min` is
 * always inclusive; `max` is inclusive by default (set
 * `inclusive: false` for `[min, max)`).
 *
 * @example
 * inRange(5, 0, 10); // true
 * inRange(10, 0, 10, { inclusive: false }); // false
 */
export default function inRange(
  value: number,
  min: number,
  max: number,
  options: InRangeOptions = {},
): boolean {
  const inclusive = options.inclusive ?? true;

  if (min > max) {
    [min, max] = [max, min];
  }

  if (value < min) {
    return false;
  }

  return inclusive ? value <= max : value < max;
}
