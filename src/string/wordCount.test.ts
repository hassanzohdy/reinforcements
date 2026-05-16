import wordCount from "./wordCount";

describe("reinforcements/string/wordCount", () => {
  it("counts whitespace-separated words", () => {
    expect(wordCount("hello world")).toBe(2);
    expect(wordCount("  hello   world  ")).toBe(2);
    expect(wordCount("one")).toBe(1);
  });

  it("returns 0 for empty input", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("   ")).toBe(0);
  });
});
