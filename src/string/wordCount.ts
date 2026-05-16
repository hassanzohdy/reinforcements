const WHITESPACE_RUN = /\s+/;

/**
 * Count whitespace-separated words in `string`.
 *
 * @example
 * wordCount("hello world"); // 2
 * wordCount(""); // 0
 */
export default function wordCount(string: string): number {
  if (!string) {
    return 0;
  }

  const trimmed = string.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(WHITESPACE_RUN).length;
}
