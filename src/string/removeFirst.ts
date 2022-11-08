import replaceFirst from "./replaceFirst";

/**
 * Remove the first occurrence for the the give needle
 *
 * @param  string needle
 * @return string
 */
export default function removeFirst(string: string, needle: string): string {
  if (!string) return "";
  return replaceFirst(string, needle, "");
}
