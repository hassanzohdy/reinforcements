import escapeRegex from "../utils/escapeRegex";

/**
 * Replace all matched occurrence with the given string.
 * The replacement is literal: `$&`, `$1`, `` $` `` and `$'` are not expanded.
 *
 * @param   string searchText
 * @param   string replacement
 * @returns string
 */
export default function replaceAll(
  string: string,
  searchText: string,
  replacement: string,
): string {
  if (!string) return "";
  return string.replace(
    new RegExp(escapeRegex(searchText), "g"),
    () => replacement,
  );
}
