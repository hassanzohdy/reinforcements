import words from "./words";

/**
 * Convert a string to snake_case (or any underscore-style with a
 * custom separator).
 *
 * @example
 * toSnakeCase("HelloWorld"); // "hello_world"
 * toSnakeCase("AIAgent"); // "ai_agent"
 */
export default function toSnakeCase(
  string: string,
  separator = "_",
  lowerAll = true,
): string {
  if (!string) {
    return "";
  }

  const tokens = words(string);

  if (!lowerAll) {
    return tokens.join(separator);
  }

  return tokens.map(word => word.toLowerCase()).join(separator);
}
