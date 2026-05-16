export type StripHtmlTagsOptions = {
  /** String to replace each tag with. Default: `""`. */
  replacement?: string;
  /** Also strip the *content* of `<script>` and `<style>` blocks. Default: `true`. */
  stripScriptsAndStyles?: boolean;
  /** Also strip HTML comments (`<!-- ... -->`). Default: `true`. */
  stripComments?: boolean;
};

const TAG_PATTERN = /<\/?[a-zA-Z][^>]*>/g;
const COMMENT_PATTERN = /<!--[\s\S]*?-->/g;
const SCRIPT_BLOCK = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
const STYLE_BLOCK = /<style\b[^>]*>[\s\S]*?<\/style>/gi;

/**
 * Strip HTML tags from `string`. By default, `<script>` and `<style>`
 * blocks are removed *including their content* and HTML comments are
 * also removed; all other tags are replaced (their text content is
 * kept).
 *
 * Note: this is a regex-based string transform, not an HTML sanitizer.
 * For untrusted HTML where attacker-controlled markup may appear, use
 * a parser-based sanitizer such as DOMPurify.
 *
 * @example
 * stripHtmlTags("<p>Hello <b>world</b></p>"); // "Hello world"
 * stripHtmlTags("<p>hi</p>", { replacement: " " }); // " hi "
 * stripHtmlTags("<script>alert(1)</script>safe"); // "safe"
 */
export default function stripHtmlTags(
  string: string,
  options: StripHtmlTagsOptions = {},
): string {
  if (!string) {
    return "";
  }

  const replacement = options.replacement ?? "";
  const stripScriptsAndStyles = options.stripScriptsAndStyles ?? true;
  const stripComments = options.stripComments ?? true;

  let result = string;

  if (stripScriptsAndStyles) {
    result = result.replace(SCRIPT_BLOCK, replacement);
    result = result.replace(STYLE_BLOCK, replacement);
  }

  if (stripComments) {
    result = result.replace(COMMENT_PATTERN, replacement);
  }

  return result.replace(TAG_PATTERN, replacement);
}
