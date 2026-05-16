import ucfirst from "./ucfirst";

describe("reinforcements/string/ucfirst", () => {
  it("uppercases the first character", () => {
    expect(ucfirst("hello")).toBe("Hello");
    expect(ucfirst("Hello")).toBe("Hello");
  });

  it("returns empty for empty input", () => {
    expect(ucfirst("")).toBe("");
  });
});
