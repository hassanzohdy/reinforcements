/**
 * Reverse a string. Unicode-safe — `Array.from` splits on grapheme
 * units for surrogate-pair preservation.
 *
 * @example
 * reverse("hello"); // "olleh"
 */
export default function reverse(string: string): string {
  if (!string) {
    return "";
  }

  return Array.from(string).reverse().join("");
}
