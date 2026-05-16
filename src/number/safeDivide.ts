/**
 * Divide `a` by `b`. Returns `fallback` (default `0`) when `b` is zero
 * or the result is non-finite (`Infinity`, `-Infinity`, `NaN`).
 *
 * @example
 * safeDivide(10, 2); // 5
 * safeDivide(10, 0); // 0
 * safeDivide(10, 0, null); // null
 */
export default function safeDivide<F = number>(
  a: number,
  b: number,
  fallback?: F,
): number | F {
  const fallbackValue = fallback === undefined ? (0 as unknown as F) : fallback;

  if (b === 0) {
    return fallbackValue;
  }

  const result = a / b;

  if (!Number.isFinite(result)) {
    return fallbackValue;
  }

  return result;
}
