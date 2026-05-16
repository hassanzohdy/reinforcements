import mask from "./mask";

describe("reinforcements/string/mask", () => {
  it("masks the middle keeping start/end visible", () => {
    expect(mask("4242424242424242", { start: 0, end: 4 })).toBe(
      "************4242",
    );
    expect(mask("hassanzohdy", { start: 2, end: 2 })).toBe("ha*******dy");
  });

  it("supports a custom mask character", () => {
    expect(mask("hello", { start: 1, end: 1, char: "#" })).toBe("h###o");
  });

  it("returns the input untouched when start+end >= length", () => {
    expect(mask("hi", { start: 1, end: 1 })).toBe("hi");
  });
});
