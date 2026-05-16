import slugify from "./slugify";

describe("reinforcements/string/slugify", () => {
  it("produces URL-safe slugs", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
    expect(slugify("  spaced  out  ")).toBe("spaced-out");
  });

  it("strips diacritics", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("naïve")).toBe("naive");
  });

  it("respects custom separator and lower flag", () => {
    expect(slugify("Hello World", { separator: "_" })).toBe("hello_world");
    expect(slugify("Hello World", { lower: false })).toBe("Hello-World");
  });
});
