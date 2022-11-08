/**
 * Cut string for the given length and append ... if string is larger than the given length
 *
 */
export default function readMoreChars(
  string: string,
  length: number,
  readMoreDots = "...",
): string {
  if (!string) return "";
  if (string.length <= length) return string;

  return string.substring(0, length) + readMoreDots;
}
