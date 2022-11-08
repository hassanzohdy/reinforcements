import ucfirst from "./ucfirst";

/**
 * Capitalize the first letter of the string
 *
 * @return string
 */
export default function capitalize(string: string): string {
  if (!string) return "";
  return string
    .split(" ")
    .map(word => ucfirst(word))
    .join(" ");
}
