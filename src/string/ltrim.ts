/**
 * Remove the given needle (repeated) from the start of string.
 * An empty needle returns the string unchanged. Linear time.
 *
 * @param string needle
 * @return string
 */
export default function ltrim(string: string, needle = " "): string {
  if (!string) return "";
  if (!needle) return string;

  const length = needle.length;
  let start = 0;

  while (string.startsWith(needle, start)) {
    start += length;
  }

  return string.slice(start);
}
