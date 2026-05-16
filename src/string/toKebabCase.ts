import toSnakeCase from "./toSnakeCase";

/**
 * Convert a string to kebab-case.
 *
 * @example
 * toKebabCase("HelloWorld"); // "hello-world"
 * toKebabCase("AIAgent"); // "ai-agent"
 */
export default function toKebabCase(string: string, lowerAll = true): string {
  return toSnakeCase(string, "-", lowerAll);
}
