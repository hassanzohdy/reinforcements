/**
 * Replace the last occurrence for the the give needle
 *
 * @param  string needle
 * @param  string replacement
 * @return string
 */
export default function replaceLast(
  string: string,
  needle: string,
  replacement: string,
): string {
  const lastIndex = string.lastIndexOf(needle);

  if (lastIndex < 0) {
    return string;
  }

  return (
    string.substr(0, lastIndex) +
    replacement +
    string.substr(lastIndex + needle.length)
  );
}
