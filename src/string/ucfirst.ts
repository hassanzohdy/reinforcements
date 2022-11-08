/**
 * Capitalize the first letter in the string
 *
 * @return string
 */
export default function ucfirst(string: string): string {
  if (!string) return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
}
