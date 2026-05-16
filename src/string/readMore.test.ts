import readMoreChars from "./readMoreChars";
import readMoreWords from "./readMoreWords";

describe("reinforcements/string/readMoreChars", () => {
  it("returns input unchanged when within length", () => {
    expect(readMoreChars("hi", 10)).toBe("hi");
  });

  it("appends suffix when truncating", () => {
    expect(readMoreChars("hello world", 5)).toBe("hello...");
    expect(readMoreChars("hello world", 5, "…")).toBe("hello…");
  });
});

describe("reinforcements/string/readMoreWords", () => {
  it("returns input unchanged when within word count", () => {
    expect(readMoreWords("hello world", 5)).toBe("hello world");
  });

  it("appends suffix when truncating", () => {
    expect(readMoreWords("a b c d e", 3)).toBe("a b c...");
  });
});
