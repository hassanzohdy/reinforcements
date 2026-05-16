const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escape HTML-special characters in a string.
 *
 * @example
 * escapeHtml('<a href="x">'); // "&lt;a href=&quot;x&quot;&gt;"
 */
export default function escapeHtml(string: string): string {
  if (!string) return "";

  return string.replace(/[&<>"']/g, ch => HTML_ESCAPE_MAP[ch]);
}
