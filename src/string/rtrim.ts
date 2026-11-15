/**
 * Remove the given needle (repeated) from the end of string.
 * An empty needle returns the string unchanged. Linear time.
 *
 * @param string needle
 * @return string
 */
export default function rtrim(string: string, needle = " "): string {
  if (!string) return "";
  if (!needle) return string;

  const length = needle.length;
  let end = string.length;

  while (end - length >= 0 && string.startsWith(needle, end - length)) {
    end -= length;
  }

  return string.slice(0, end);
}
