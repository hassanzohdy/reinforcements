import escapeHtml from "./escapeHtml";
import unescapeHtml from "./unescapeHtml";

describe("reinforcements/string/escapeHtml", () => {
  it("escapes HTML-special characters", () => {
    expect(escapeHtml('<a href="x">hi & bye</a>')).toBe(
      "&lt;a href=&quot;x&quot;&gt;hi &amp; bye&lt;/a&gt;",
    );
  });

  it("round-trips with unescapeHtml", () => {
    const input = `<b>"it's" & </b>`;
    expect(unescapeHtml(escapeHtml(input))).toBe(input);
  });
});
