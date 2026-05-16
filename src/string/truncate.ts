export type TruncatePosition = "end" | "middle";

export type TruncateOptions = {
  /** Suffix appended when truncation occurs. Default: `"..."`. */
  suffix?: string;
  /** Truncate at word boundaries instead of mid-word. Default: `false`. */
  byWord?: boolean;
  /** Where to remove characters from. Default: `"end"`. */
  position?: TruncatePosition;
};

const DEFAULT_SUFFIX = "...";

/**
 * Shorten a string to at most `length` characters (including the
 * suffix), optionally on word boundaries or at the middle.
 *
 * @example
 * truncate("Hello world", 5); // "He..."
 * truncate("Hello world", 8, { byWord: true }); // "Hello..."
 * truncate("abcdefghij", 7, { position: "middle" }); // "ab...ij"
 */
export default function truncate(
  string: string,
  length: number,
  options: TruncateOptions = {},
): string {
  if (!string) {
    return "";
  }

  if (string.length <= length) {
    return string;
  }

  const suffix = options.suffix ?? DEFAULT_SUFFIX;
  const position = options.position ?? "end";
  const byWord = options.byWord ?? false;

  if (length <= suffix.length) {
    return suffix.slice(0, length);
  }

  if (position === "middle") {
    return truncateMiddle(string, length, suffix);
  }

  return truncateEnd(string, length, suffix, byWord);
}

function truncateMiddle(
  string: string,
  length: number,
  suffix: string,
): string {
  const room = length - suffix.length;
  const front = Math.ceil(room / 2);
  const back = Math.floor(room / 2);

  return string.slice(0, front) + suffix + string.slice(string.length - back);
}

function truncateEnd(
  string: string,
  length: number,
  suffix: string,
  byWord: boolean,
): string {
  const room = length - suffix.length;

  let head = string.slice(0, room);

  if (byWord) {
    const nextChar = string.charAt(room);
    const cutsMidWord = nextChar !== "" && nextChar !== " ";

    if (cutsMidWord) {
      const lastSpace = head.lastIndexOf(" ");

      if (lastSpace > 0) {
        head = head.slice(0, lastSpace);
      }
    }
  }

  return head + suffix;
}
