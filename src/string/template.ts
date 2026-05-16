import get from "../object/get";

const PLACEHOLDER_PATTERN = /\{([^{}]+)\}/g;

/**
 * Interpolate `{path}` placeholders in a template string using values
 * from `vars`. Paths support dot notation.
 *
 * @example
 * template("Hello {name}!", { name: "Ada" }); // "Hello Ada!"
 * template("{user.name} is {user.age}", { user: { name: "Ada", age: 36 } });
 * // "Ada is 36"
 */
export default function template(
  string: string,
  vars: Record<string, any>,
): string {
  if (!string) {
    return "";
  }

  return string.replace(PLACEHOLDER_PATTERN, (_match, path: string) => {
    const value = get(vars, path.trim(), undefined);

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
}
