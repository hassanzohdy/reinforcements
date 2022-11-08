import escapeRegex from "../utils/escapeRegex";

/**
 * Remove the given needle from the start of string
 *
 * @param string needle
 * @return string
 */
export default function ltrim(string: string, needle = " "): string {
  if (!string) return "";
  const pattern = "^" + escapeRegex(needle) + "+",
    regex = new RegExp(pattern, "g");

  return string.replace(regex, "");
}
