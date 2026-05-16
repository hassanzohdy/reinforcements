import ucfirst from "./ucfirst";

const WHITESPACE_RUN = /\s+/;
const WHITESPACE_GROUP = /(\s+)/;

/**
 * Capitalize the first letter of each whitespace-separated word.
 *
 * @example
 * capitalize("hello world"); // "Hello World"
 */
export default function capitalize(string: string): string {
  if (!string) {
    return "";
  }

  return string
    .split(WHITESPACE_GROUP)
    .map(part => (WHITESPACE_RUN.test(part) ? part : ucfirst(part)))
    .join("");
}
