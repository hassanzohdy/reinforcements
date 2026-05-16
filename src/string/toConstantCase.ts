import words from "./words";

/**
 * Convert a string to CONSTANT_CASE (screaming snake case).
 *
 * @example
 * toConstantCase("helloWorld"); // "HELLO_WORLD"
 */
export default function toConstantCase(string: string): string {
  if (!string) return "";
  return words(string)
    .map(word => word.toUpperCase())
    .join("_");
}
