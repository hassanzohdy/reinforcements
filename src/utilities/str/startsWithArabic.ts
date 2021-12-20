import trim from "./trim";

export const ARABIC_PATTERN = /[\u0600-\u06FF]/;

export default function startsWithArabic(
  text: string,
  trimmed: boolean = true
): boolean {
  if (trimmed === true) {
    text = trim(String(text));
  }
  return text.charAt(0).match(ARABIC_PATTERN) !== null;
}
