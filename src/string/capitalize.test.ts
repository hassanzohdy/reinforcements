import capitalize from "./capitalize";

describe("reinforcements/string/capitalize", () => {
  it("capitalizes the first letter of each word", () => {
    expect(capitalize("hello world")).toBe("Hello World");
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles multiple whitespace gracefully", () => {
    expect(capitalize("hello  world")).toBe("Hello  World");
    expect(capitalize("hello\tworld")).toBe("Hello\tWorld");
  });

  it("returns empty for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});
