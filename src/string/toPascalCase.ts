import toStudlyCase from "./toStudlyCase";

/**
 * Alias of {@link toStudlyCase} using the more common name.
 *
 * @example
 * toPascalCase("hello-world"); // "HelloWorld"
 */
export default function toPascalCase(string: string): string {
  return toStudlyCase(string);
}
