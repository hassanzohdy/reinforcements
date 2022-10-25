import toSnakeCase from "./toSnakeCase";

/**
 * Convert current string to kebab case
 */
export default function toKebabCase(string: string, lowerAll = true): string {
  return toSnakeCase(string, "-", lowerAll);
}
