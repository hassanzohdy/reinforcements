import capitalize from "./capitalize";

export default function toCamelCase(
  string: string,
  separator = "\\s+|-|/|_|\\.",
): string {
  if (!string) return "";

  const regex = new RegExp(separator + "|(?=[A-Z])", "g");

  return string
    .split(regex)
    .map((word, index) => (index > 0 ? capitalize(word) : word.toLowerCase()))
    .join("");
}
