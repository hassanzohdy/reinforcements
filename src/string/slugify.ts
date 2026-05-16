import words from "./words";

export type SlugifyOptions = {
  /** Separator between slug segments. Default: `"-"`. */
  separator?: string;
  /** Lowercase the result. Default: `true`. */
  lower?: boolean;
  /** Strip every non-alphanumeric character (after token split). Default: `true`. */
  strict?: boolean;
};

const DIACRITICS_PATTERN = /[̀-ͯ]/g;
const NON_ALPHANUMERIC = /[^a-zA-Z0-9]/g;

/**
 * Slugify a string for URL/segment use. Diacritics are stripped,
 * tokens are split via {@link words}, and joined by `separator`.
 *
 * @example
 * slugify("Hello, World!"); // "hello-world"
 * slugify("café & croissant", { separator: "_" }); // "cafe_croissant"
 */
export default function slugify(
  string: string,
  options: SlugifyOptions = {},
): string {
  if (!string) {
    return "";
  }

  const separator = options.separator ?? "-";
  const lower = options.lower ?? true;
  const strict = options.strict ?? true;

  const stripped = string.normalize("NFKD").replace(DIACRITICS_PATTERN, "");

  const tokens = words(stripped).map(token =>
    strict ? token.replace(NON_ALPHANUMERIC, "") : token,
  );

  const joined = tokens.filter(Boolean).join(separator);

  return lower ? joined.toLowerCase() : joined;
}
