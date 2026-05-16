/**
 * Pad `string` from the start until it reaches `length`. Typed wrapper
 * around `String.prototype.padStart` with empty-input handling.
 *
 * @example
 * padStart("7", 3, "0"); // "007"
 */
export default function padStart(
  string: string,
  length: number,
  char = " ",
): string {
  if (string === null || string === undefined) string = "";
  return String(string).padStart(length, char);
}
