import replaceLast from "./replaceLast";

/**
 * Remove the last occurrence for the the give needle
 *
 * @param  string needle
 * @return string
 */
export default function removeLast(string: string, needle: string): string {
  return replaceLast(string, needle, "");
}
