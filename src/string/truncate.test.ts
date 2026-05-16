import truncate from "./truncate";

describe("reinforcements/string/truncate", () => {
  it("returns input unchanged when shorter than length", () => {
    expect(truncate("hi", 10)).toBe("hi");
  });

  it("truncates from the end with default suffix", () => {
    expect(truncate("hello world", 8)).toBe("hello...");
  });

  it("supports a custom suffix", () => {
    expect(truncate("hello world", 7, { suffix: "…" })).toBe("hello …");
  });

  it("truncates on word boundary when byWord is true", () => {
    expect(truncate("hello world there", 14, { byWord: true })).toBe("hello world...");
  });

  it("supports middle truncation", () => {
    expect(truncate("abcdefghij", 7, { position: "middle" })).toBe("ab...ij");
  });
});
