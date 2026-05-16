export type FormatNumberOptions = Intl.NumberFormatOptions & {
  /** BCP-47 locale tag passed to `Intl.NumberFormat`. */
  locale?: string | string[];
};

/**
 * Format a number using `Intl.NumberFormat`. Pass any standard
 * `Intl.NumberFormatOptions` plus an optional `locale`.
 *
 * @example
 * formatNumber(1234567.89); // "1,234,567.89"  (en-US default)
 * formatNumber(0.42, { style: "percent" }); // "42%"
 */
export default function formatNumber(
  value: number,
  options: FormatNumberOptions = {},
): string {
  const { locale, ...intlOptions } = options;

  return new Intl.NumberFormat(locale, intlOptions).format(value);
}
