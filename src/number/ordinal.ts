export type OrdinalOptions = {
  /**
   * Prefix the number to the suffix (`"21st"`). When `false`, only the
   * suffix is returned (`"st"`). Default: `true`.
   */
  withNumber?: boolean;
};

/**
 * Return the English ordinal for an integer — `1 → "1st"`, `2 → "2nd"`,
 * `3 → "3rd"`, `4 → "4th"`. Handles the 11–13 exception (`"11th"`,
 * `"12th"`, `"13th"`) and negative numbers; the fractional part is
 * truncated.
 *
 * @example
 * ordinal(1);   // "1st"
 * ordinal(22);  // "22nd"
 * ordinal(113); // "113th"
 * ordinal(2, { withNumber: false }); // "nd"
 */
export default function ordinal(
  value: number,
  options: OrdinalOptions = {},
): string {
  const withNumber = options.withNumber ?? true;
  const integer = Math.trunc(value);
  const abs = Math.abs(integer);
  const lastTwo = abs % 100;
  const lastOne = abs % 10;

  let suffix = "th";

  if (lastTwo < 11 || lastTwo > 13) {
    if (lastOne === 1) {
      suffix = "st";
    } else if (lastOne === 2) {
      suffix = "nd";
    } else if (lastOne === 3) {
      suffix = "rd";
    }
  }

  return withNumber ? `${integer}${suffix}` : suffix;
}
