import capitalize from "./capitalize";

export default function toCamelCase(
  string: string,
  separator: string = "\\s+|-|/|_|\\."
): string {
  const regex = new RegExp(separator + "|(?=[A-Z])", "g");

  return string
    .split(regex)
    .map((word, index) => (index > 0 ? capitalize(word) : word.toLowerCase()))
    .join("");
}
