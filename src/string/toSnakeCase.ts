/**
 * Convert current string to snake case
 * i.e hello-world will become: hello_world
 *
 * @return string
 */
export default function toSnakeCase(
  string: string,
  separator = "_",
  lowerAll = true,
): string {
  return string
    .replace(/(-|\/|\s|([A-Z]))+/g, function (_match, _v2, matchedUpperLetter) {
      if (!matchedUpperLetter) return separator;

      return (
        separator +
        (lowerAll ? matchedUpperLetter.toLowerCase() : matchedUpperLetter)
      );
    })
    .replace(new RegExp(`^${separator}`), "");
}
