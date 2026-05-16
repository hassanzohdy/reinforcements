/**
 * Pad `string` from the end until it reaches `length`. Typed wrapper
 * around `String.prototype.padEnd` with empty-input handling.
 *
 * @example
 * padEnd("7", 3, "0"); // "700"
 */
export default function padEnd(
  string: string,
  length: number,
  char = " ",
): string {
  if (string === null || string === undefined) string = "";
  return String(string).padEnd(length, char);
}
