/**
 * Replace the First occurrence for the the give needle. Both the needle
 * and the replacement are literal (no regex or `$&` expansion).
 *
 * @param  string needle
 * @param  string replacement
 * @return string
 */
export default function replaceFirst(
  string: string,
  needle: string,
  replacement: string,
): string {
  if (!string) return "";

  const index = string.indexOf(needle);

  if (index < 0) {
    return string;
  }

  return (
    string.slice(0, index) + replacement + string.slice(index + needle.length)
  );
}
