import capitalize from "./capitalize";

export default function toCamelCase(string: string): string {
  let separator = "\\s+|-|_|(?=[A-Z])",
    regex = new RegExp(separator, "g");

  return string
    .split(regex)
    .map((word, index) => (index > 0 ? capitalize(word) : word.toLowerCase()))
    .join("");
}
