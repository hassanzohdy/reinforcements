import toTitleCase from "./toTitleCase";

describe("reinforcements/string/toTitleCase", () => {
  it("title-cases sentences and keeps stop words lowercase", () => {
    expect(toTitleCase("the lord of the rings")).toBe("The Lord of the Rings");
    expect(toTitleCase("a tale of two cities")).toBe("A Tale of Two Cities");
  });

  it("respects custom stop words", () => {
    expect(toTitleCase("hello vs world", { stopWords: ["vs"] })).toBe(
      "Hello vs World",
    );
  });
});
