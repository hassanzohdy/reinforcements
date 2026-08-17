import repeatsOf from "./repeatsOf";

describe("reinforcements/string/repeatsOf", () => {
  it("counts case-sensitive occurrences", () => {
    expect(repeatsOf("abcabc", "a")).toBe(2);
    expect(repeatsOf("abcabc", "A")).toBe(0);
  });

  it("counts case-insensitive occurrences", () => {
    expect(repeatsOf("AbcAbc", "a", false)).toBe(2);
  });

  it("returns 0 for empty input", () => {
    expect(repeatsOf("", "x")).toBe(0);
  });

  it("treats regex metacharacters literally", () => {
    expect(repeatsOf("a(a", "(")).toBe(1);
    expect(repeatsOf("a.b.c", ".")).toBe(2);
    expect(repeatsOf("a+b", "+")).toBe(1);
    expect(repeatsOf("[x]", "[x]")).toBe(1);
    expect(repeatsOf("abc", ".")).toBe(0);
  });

  it("does not evaluate an injected pattern or backtrack on it", () => {
    const started = Date.now();

    expect(repeatsOf("a".repeat(40) + "!", "(a+)+$")).toBe(0);
    expect(repeatsOf("aaa", "a|b")).toBe(0);
    expect(Date.now() - started).toBeLessThan(1000);
  });
});
