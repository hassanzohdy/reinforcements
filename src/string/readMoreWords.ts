/**
 * Cut string for the given spaces and append ... if string is larger than the given length
 *
 */
export default function readMoreWords(
  string: string,
  length: number,
  readMoreDots = "...",
): string {
  if (!string) return "";
  const wordsList = string.split(" ");
  const words = wordsList.slice(0, length);

  return (
    words.join(" ") + (words.length < wordsList.length ? readMoreDots : "")
  );
}
