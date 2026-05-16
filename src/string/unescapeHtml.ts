const HTML_UNESCAPE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
};

/**
 * Reverse of {@link escapeHtml}: convert HTML entities back to their
 * literal characters.
 *
 * @example
 * unescapeHtml("&lt;b&gt;hi&lt;/b&gt;"); // "<b>hi</b>"
 */
export default function unescapeHtml(string: string): string {
  if (!string) return "";
  return string.replace(/&(amp|lt|gt|quot|#39|apos);/g, match => HTML_UNESCAPE_MAP[match]);
}
