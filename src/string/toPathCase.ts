import toSnakeCase from "./toSnakeCase";

/**
 * Convert a string to path/case.
 *
 * @example
 * toPathCase("HelloWorld"); // "hello/world"
 */
export default function toPathCase(string: string, lowerAll = true): string {
  return toSnakeCase(string, "/", lowerAll);
}
