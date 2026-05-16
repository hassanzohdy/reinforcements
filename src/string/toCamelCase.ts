import words from "./words";

/**
 * Convert a string to camelCase.
 *
 * @example
 * toCamelCase("hello-world"); // "helloWorld"
 * toCamelCase("XMLHttpRequest"); // "xmlHttpRequest"
 */
export default function toCamelCase(string: string): string {
  if (!string) {
    return "";
  }

  const tokens = words(string);

  return tokens.map(toSegment).join("");
}

function toSegment(word: string, index: number): string {
  if (index === 0) {
    return word.toLowerCase();
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
