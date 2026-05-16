export type CharCountOptions = {
  /** Count graphemes (emoji-aware) instead of UTF-16 code units. Default: `false`. */
  unicode?: boolean;
};

/**
 * Count characters in `string`. Defaults to UTF-16 code units
 * (matching `string.length`); pass `{ unicode: true }` for grapheme
 * counting where supported.
 *
 * @example
 * charCount("hello"); // 5
 * charCount("👨‍👩‍👧", { unicode: true }); // 1
 */
export default function charCount(
  string: string,
  options: CharCountOptions = {},
): number {
  if (!string) {
    return 0;
  }

  if (!options.unicode) {
    return string.length;
  }

  return countGraphemes(string);
}

function countGraphemes(string: string): number {
  const SegmenterCtor = Intl.Segmenter;

  if (typeof SegmenterCtor !== "function") {
    return Array.from(string).length;
  }

  const segmenter = new SegmenterCtor(undefined, { granularity: "grapheme" });

  let count = 0;

  for (const _ of segmenter.segment(string)) {
    count++;
  }

  return count;
}
