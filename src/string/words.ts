const SEPARATOR_PATTERN = /[-_./\\\s]+/g;
const ACRONYM_BOUNDARY = /([A-Z]+)([A-Z][a-z])/g;
const CAMEL_BOUNDARY = /([a-z\d])([A-Z])/g;
const WHITESPACE_RUN = /\s+/;

/**
 * Split a string into its semantic word tokens. Handles camelCase,
 * PascalCase, snake_case, kebab-case, dot.case, slash/separated and
 * whitespace, and correctly preserves acronym runs.
 *
 * @example
 * words("XMLHttpRequest"); // ["XML", "Http", "Request"]
 * words("hello_world"); // ["hello", "world"]
 * words("AIAgent"); // ["AI", "Agent"]
 */
export default function words(input: string): string[] {
  if (!input) {
    return [];
  }

  const normalised = input
    .replace(SEPARATOR_PATTERN, " ")
    .replace(ACRONYM_BOUNDARY, "$1 $2")
    .replace(CAMEL_BOUNDARY, "$1 $2")
    .trim();

  if (!normalised) {
    return [];
  }

  return normalised.split(WHITESPACE_RUN).filter(Boolean);
}
