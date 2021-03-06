/**
 * Get total repeats of the given string
 *
 * @param string $needle
 * @return int
 */
export default function repeatsOf(
  string: string,
  needle: string,
  caseSensitive: boolean = true
): number {
  let flags = "g";
  if (caseSensitive === false) {
    flags += "i";
  }

  let regex = new RegExp(`${needle}`, flags);

  return string.split(regex).length - 1;
}
