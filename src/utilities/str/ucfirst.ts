/**
 * Capitalize the first letter in the string
 *
 * @return string
 */
export default function ucfirst(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
