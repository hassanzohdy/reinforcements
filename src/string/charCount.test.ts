import charCount from "./charCount";

describe("reinforcements/string/charCount", () => {
  it("counts UTF-16 code units by default", () => {
    expect(charCount("hello")).toBe(5);
  });

  it("counts graphemes when unicode is true", () => {
    expect(charCount("ab", { unicode: true })).toBe(2);
  });

  it("returns 0 for empty input", () => {
    expect(charCount("")).toBe(0);
  });
});
