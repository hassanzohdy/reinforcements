import toSnakeCase from "./toSnakeCase";

/**
 * Convert a string to dot.case.
 *
 * @example
 * toDotCase("HelloWorld"); // "hello.world"
 */
export default function toDotCase(string: string, lowerAll = true): string {
  return toSnakeCase(string, ".", lowerAll);
}
