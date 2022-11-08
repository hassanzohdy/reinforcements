/**
 * Get total repeats of the given string
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

  const regex = new RegExp(`${needle}`, flags);

  return string.split(regex).length - 1;
}
