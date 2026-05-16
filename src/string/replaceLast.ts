/**
 * Replace the last occurrence of `needle` in `string` with
 * `replacement`. Returns the input unchanged when `needle` is absent.
 *
 * @example
 * replaceLast("foo bar foo", "foo", "baz"); // "foo bar baz"
 */
export default function replaceLast(
  string: string,
  needle: string,
  replacement: string,
): string {
  if (!string) {
    return "";
  }

  const lastIndex = string.lastIndexOf(needle);

  if (lastIndex < 0) {
    return string;
  }

  const head = string.slice(0, lastIndex);
  const tail = string.slice(lastIndex + needle.length);

  return head + replacement + tail;
}
