import trim from "./trim";

export const ARABIC_PATTERN = /[\u0600-\u06FF]/;

export default function startsWithArabic(
  string: string,
  trimmed = true,
): boolean {
  if (!string) return false;

  if (trimmed === true) {
    string = trim(String(string));
  }
  return string.charAt(0).match(ARABIC_PATTERN) !== null;
}
