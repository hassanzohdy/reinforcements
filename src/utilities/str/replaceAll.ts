import escapeRegex from "../escapeRegex";

/**
 * Replace all matched occurrence with the given string
 *
 * @param   string searchText
 * @param   string replacement
 * @returns string
 */
export default function replaceAll(
  string: string,
  searchText: string,
  replacement: string
): string {
  return string.replace(new RegExp(escapeRegex(searchText), "g"), replacement);
}
