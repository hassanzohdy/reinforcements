/**
 * Remove the given needle from the start and the end of string.
 * The whole needle is repeated, so `trim("ababXab", "ab")` is `"X"`.
 * The default needle `" "` trims all whitespace. An empty needle
 * returns the string unchanged. Linear time, no regular expressions.
 *
 * @param string $needle
 * @return string
 */
export default function trim(string: string, needle = " "): string {
  if (!string) return "";

  if (needle === " ") {
    return string.trim();
  }

  if (!needle) return string;

  const length = needle.length;
  let start = 0;
  let end = string.length;

  while (string.startsWith(needle, start) && start + length <= end) {
    start += length;
  }

  while (end - length >= start && string.startsWith(needle, end - length)) {
    end -= length;
  }

  return string.slice(start, end);
}
