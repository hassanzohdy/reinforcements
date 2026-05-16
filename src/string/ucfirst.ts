/**
 * Uppercase the first character of `string`.
 *
 * @example
 * ucfirst("hello"); // "Hello"
 */
export default function ucfirst(string: string): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
