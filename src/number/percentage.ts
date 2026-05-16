import round from "./round";

/**
 * Return `value` as a percentage of `total`. Returns `0` when `total`
 * is `0` to avoid `Infinity`/`NaN`.
 *
 * @example
 * percentage(25, 200); // 12.5
 * percentage(7, 9, 1); // 77.8
 */
export default function percentage(
  value: number,
  total: number,
  decimals = 2,
): number {
  if (!total) {
    return 0;
  }

  return round((value / total) * 100, decimals);
}
