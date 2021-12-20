/**
 * Escape the regex of the given string
 */
export default function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
