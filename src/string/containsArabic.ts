import { ARABIC_REGEX } from "./startsWithArabic";

/**
 * Return `true` when `string` contains at least one Arabic character.
 *
 * @example
 * containsArabic("hello مرحبا"); // true
 * containsArabic("hello"); // false
 */
export default function containsArabic(string: string): boolean {
  if (!string) return false;
  return ARABIC_REGEX.test(string);
}
