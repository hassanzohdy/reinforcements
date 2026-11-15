export type StripHtmlTagsOptions = {
  /** String to replace each tag with, used literally. Default: `""`. */
  replacement?: string;
  /** Also strip the *content* of `<script>` and `<style>` blocks. Default: `true`. */
  stripScriptsAndStyles?: boolean;
  /** Also strip HTML comments (`<!-- ... -->`). Default: `true`. */
  stripComments?: boolean;
};

const TAG_PATTERN = /<\/?[a-zA-Z][^>]*>/g;
const COMMENT_OPEN = /<!--/g;
const COMMENT_CLOSE = /-->/g;
const SCRIPT_OPEN = /<script\b/gi;
const SCRIPT_CLOSE = /<\/script>/gi;
const STYLE_OPEN = /<style\b/gi;
const STYLE_CLOSE = /<\/style>/gi;

/**
 * Remove every `open ... close` block, the same matches a lazy
 * `open[^>]*>[\s\S]*?close` (or `open[\s\S]*?close`) regex finds, in
 * linear time. The regex form rescans to the end of the string from
 * every unterminated opener, which is quadratic on input such as
 * `"<script".repeat(n)`. Here, once no `>` or closer follows an opener,
 * no later opener can match either, so the scan stops.
 */
function stripBlocks(
  input: string,
  open: RegExp,
  close: RegExp,
  toTagEnd: boolean,
  replacement: string,
): string {
  let output = "";
  let cursor = 0;

  while (cursor < input.length) {
    open.lastIndex = cursor;

    const opener = open.exec(input);

    if (!opener) break;

    let bodyStart = opener.index + opener[0].length;

    if (toTagEnd) {
      const tagEnd = input.indexOf(">", bodyStart);

      if (tagEnd < 0) break;

      bodyStart = tagEnd + 1;
    }

    close.lastIndex = bodyStart;

    const closer = close.exec(input);

    if (!closer) break;

    output += input.slice(cursor, opener.index) + replacement;
    cursor = closer.index + closer[0].length;
  }

  return output + input.slice(cursor);
}

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
    result = stripBlocks(result, SCRIPT_OPEN, SCRIPT_CLOSE, true, replacement);
    result = stripBlocks(result, STYLE_OPEN, STYLE_CLOSE, true, replacement);
  }

  if (stripComments) {
    result = stripBlocks(
      result,
      COMMENT_OPEN,
      COMMENT_CLOSE,
      false,
      replacement,
    );
  }

  // A tag needs a closing `>`, so nothing after the last `>` can match.
  // Leaving that tail out keeps the regex linear on unterminated tags
  // such as `"<a".repeat(n)` (it would otherwise rescan to the end of
  // the string from every `<a`), with the same matches as before.
  const lastTagEnd = result.lastIndexOf(">");

  if (lastTagEnd < 0) {
    return result;
  }

  return (
    result.slice(0, lastTagEnd + 1).replace(TAG_PATTERN, () => replacement) +
    result.slice(lastTagEnd + 1)
  );
}
