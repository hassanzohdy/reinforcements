import round from "./round";

/**
 * Like `Number.prototype.toFixed`, but returns a `number` (not a string)
 * and uses correct rounding instead of the banker's-style coercion bugs.
 *
 * @example
 * toFixed(1.005, 2); // 1.01
 */
export default function toFixed(value: number, precision = 0): number {
  return round(value, precision);
}
