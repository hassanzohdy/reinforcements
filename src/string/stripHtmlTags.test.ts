import stripHtmlTags from "./stripHtmlTags";

describe("reinforcements/string/stripHtmlTags", () => {
  it("strips simple tags and keeps text content", () => {
    expect(stripHtmlTags("<p>Hello <b>world</b></p>")).toBe("Hello world");
  });

  it("strips self-closing tags", () => {
    expect(stripHtmlTags('hi<br/>bye<img src="x.png" />')).toBe("hibye");
  });

  it("strips tags with attributes", () => {
    expect(
      stripHtmlTags('<a href="https://example.com" target="_blank">link</a>'),
    ).toBe("link");
  });

  it("removes script blocks including their content", () => {
    expect(stripHtmlTags("<script>alert('xss')</script>safe")).toBe("safe");
  });

  it("removes style blocks including their content", () => {
    expect(stripHtmlTags("<style>body { color: red }</style>hi")).toBe("hi");
  });

  it("removes HTML comments", () => {
    expect(stripHtmlTags("before<!-- secret -->after")).toBe("beforeafter");
  });

  it("supports a custom replacement string", () => {
    expect(stripHtmlTags("<p>hi</p>", { replacement: " " })).toBe(" hi ");
  });

  it("can keep script/style content when disabled", () => {
    expect(
      stripHtmlTags("<script>code</script>", { stripScriptsAndStyles: false }),
    ).toBe("code");
  });

  it("can keep comments when disabled", () => {
    expect(stripHtmlTags("<!-- keep -->", { stripComments: false })).toBe(
      "<!-- keep -->",
    );
  });

  it("leaves text without tags unchanged", () => {
    expect(stripHtmlTags("plain text")).toBe("plain text");
  });

  it("returns empty for empty input", () => {
    expect(stripHtmlTags("")).toBe("");
  });

  it("does not strip lone < or > as tags", () => {
    expect(stripHtmlTags("2 < 3 and 4 > 1")).toBe("2 < 3 and 4 > 1");
  });
});

describe("reinforcements/string/stripHtmlTags (performance)", () => {
  it("is linear on unterminated tags, scripts, styles and comments", () => {
    const started = performance.now();

    expect(stripHtmlTags("<a".repeat(25000))).toBe("<a".repeat(25000));
    // same match as before: the tag runs to the first `>`
    expect(stripHtmlTags("<a".repeat(25000) + ">x")).toBe("x");
    expect(stripHtmlTags("<script".repeat(10000))).toBe(
      "<script".repeat(10000),
    );
    expect(stripHtmlTags("<style>".repeat(10000))).toBe("");
    expect(stripHtmlTags("<!--".repeat(10000))).toBe("<!--".repeat(10000));
    expect(performance.now() - started).toBeLessThan(200);
  });

  it("keeps the old matches around stray `<` characters", () => {
    expect(stripHtmlTags("<a <b>x")).toBe("x");
    expect(stripHtmlTags('<a title="1<2">x</a>')).toBe("x");
    expect(stripHtmlTags("<script <b>x</script>y")).toBe("y");
    expect(stripHtmlTags("<!-- a --> <!-- b")).toBe(" <!-- b");
  });

  it("uses the replacement literally", () => {
    expect(stripHtmlTags("<b>x</b>", { replacement: "$&" })).toBe("$&x$&");
    expect(stripHtmlTags("<!--c-->x", { replacement: "$'" })).toBe("$'x");
  });
});
