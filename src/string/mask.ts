export type MaskOptions = {
  /** Number of leading characters to keep visible. Default: `0`. */
  start?: number;
  /** Number of trailing characters to keep visible. Default: `0`. */
  end?: number;
  /** Replacement character for masked positions. Default: `"*"`. */
  char?: string;
};

const DEFAULT_CHAR = "*";

/**
 * Replace a span of characters in the middle of `string` with `char`,
 * keeping `start` leading and `end` trailing characters visible.
 *
 * @example
 * mask("4242424242424242", { start: 0, end: 4 }); // "************4242"
 * mask("hassan@example.com", { start: 2, end: 4 }); // "ha************.com"
 */
export default function mask(
  string: string,
  options: MaskOptions = {},
): string {
  if (!string) {
    return "";
  }

  const start = options.start ?? 0;
  const end = options.end ?? 0;
  const char = options.char ?? DEFAULT_CHAR;

  if (start + end >= string.length) {
    return string;
  }

  const head = string.slice(0, start);
  const tail = end > 0 ? string.slice(string.length - end) : "";
  const middle = char.repeat(string.length - start - end);

  return head + middle + tail;
}
