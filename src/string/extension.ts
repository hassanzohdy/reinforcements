/**
 * Get the file extension (the part after the last dot), or an empty
 * string if none is present.
 *
 * @example
 * extension("foo.txt"); // "txt"
 * extension("archive.tar.gz"); // "gz"
 * extension("README"); // ""
 */
export default function extension(string: string): string {
  if (!string) {
    return "";
  }

  const lastDot = string.lastIndexOf(".");

  if (lastDot < 0 || lastDot === string.length - 1) {
    return "";
  }

  return string.slice(lastDot + 1);
}
