import escapeRegex from "../utils/escapeRegex";

/**
 * Get total repeats of the given string
 *
 * The needle is matched literally — regex metacharacters carry no
 * special meaning and cannot inject a pattern.
 *
 * @param string $needle
 * @return int
 */
export default function repeatsOf(
  string: string,
  needle: string,
  caseSensitive = true,
): number {
  if (!string) return 0;
  let flags = "g";
  if (caseSensitive === false) {
    flags += "i";
  }

  const regex = new RegExp(escapeRegex(needle), flags);

  return string.split(regex).length - 1;
}
