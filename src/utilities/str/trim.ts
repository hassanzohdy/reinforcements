import escapeRegex from "../utils/escapeRegex";

/**
 * Remove the given needle from the start and the end of string
 *
 * @param string $needle
 * @return string
 */
export default function trim(string: string, needle = " "): string {
  if (needle === " ") {
    return string.replace(/^\s+|\s+$/g, "");
  }

  needle = escapeRegex(needle);

  const pattern = "^" + needle + "+|" + needle + "+$",
    regex = new RegExp(pattern, "g");

  return string.replace(regex, "");
}
