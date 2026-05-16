import words from "./words";

const DEFAULT_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "if",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "so",
  "the",
  "to",
  "up",
  "yet",
]);

export type TitleCaseOptions = {
  /** Words that should remain lowercase unless first/last. Default: common English particles. */
  stopWords?: Iterable<string>;
};

/**
 * Convert a string to Title Case, keeping common particles (a, an,
 * the, of, for, …) lowercased except at the start or end of the
 * title.
 *
 * @example
 * toTitleCase("the lord of the rings"); // "The Lord of the Rings"
 */
export default function toTitleCase(
  string: string,
  options: TitleCaseOptions = {},
): string {
  if (!string) {
    return "";
  }

  const stopWords = resolveStopWords(options.stopWords);
  const tokens = words(string);

  return tokens
    .map((word, index) =>
      formatToken(word, index, tokens.length, stopWords),
    )
    .join(" ");
}

function resolveStopWords(
  custom: Iterable<string> | undefined,
): Set<string> {
  if (!custom) {
    return DEFAULT_STOP_WORDS;
  }

  return new Set(Array.from(custom, word => word.toLowerCase()));
}

function formatToken(
  word: string,
  index: number,
  total: number,
  stopWords: Set<string>,
): string {
  const lower = word.toLowerCase();
  const isEdge = index === 0 || index === total - 1;

  if (!isEdge && stopWords.has(lower)) {
    return lower;
  }

  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
