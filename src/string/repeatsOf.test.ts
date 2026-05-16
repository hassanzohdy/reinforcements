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
});
