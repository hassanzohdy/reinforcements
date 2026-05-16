import trim from "./trim";

export const ARABIC_REGEX = /[؀-ۿ]/;

/** @deprecated Use {@link ARABIC_REGEX} instead. */
export const ARABIC_PATTERN = ARABIC_REGEX;

/**
 * Return `true` when the first character of `string` is Arabic. When
 * `trimmed` is `true` (default), surrounding whitespace is ignored.
 *
 * @example
 * startsWithArabic("مرحبا"); // true
 * startsWithArabic("  مرحبا"); // true
 */
export default function startsWithArabic(
  string: string,
  trimmed = true,
): boolean {
  if (!string) {
    return false;
  }

  const target = trimmed ? trim(String(string)) : String(string);

  return ARABIC_REGEX.test(target.charAt(0));
}
