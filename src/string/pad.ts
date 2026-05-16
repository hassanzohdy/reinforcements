/**
 * Pad `string` evenly on both sides until it reaches `length`. When
 * the needed padding is odd, the extra character is appended to the
 * end.
 *
 * @example
 * pad("hi", 6); // "  hi  "
 * pad("hi", 7, "*"); // "**hi***"
 */
export default function pad(
  string: string,
  length: number,
  char = " ",
): string {
  const value = string ?? "";

  if (value.length >= length) {
    return value;
  }

  if (!char) {
    return value;
  }

  const total = length - value.length;
  const left = Math.floor(total / 2);
  const right = total - left;

  return char.repeat(left).slice(0, left) + value + char.repeat(right).slice(0, right);
}
