import escapeRegex from "../utils/escapeRegex";

/**
 * Replace the First occurrence for the the give needle
 *
 * @param  string needle
 * @param  string replacement
 * @return string
 */
export default function replaceFirst(
  string: string,
  needle: string,
  replacement: string,
): string {
  if (!string) return "";
  return string.replace(escapeRegex(needle), replacement);
}
