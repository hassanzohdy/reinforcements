import trim from "./trim";
import ltrim from "./ltrim";
import rtrim from "./rtrim";

describe("reinforcements/string/trim", () => {
  it("trims whitespace by default", () => {
    expect(trim("  hi  ")).toBe("hi");
  });

  it("trims a custom needle from both ends", () => {
    expect(trim("---hi---", "-")).toBe("hi");
  });

  it("returns empty for empty input", () => {
    expect(trim("")).toBe("");
  });
});

describe("reinforcements/string/ltrim", () => {
  it("trims from the start only", () => {
    expect(ltrim("   hi   ")).toBe("hi   ");
    expect(ltrim("//hi", "/")).toBe("hi");
  });
});

describe("reinforcements/string/rtrim", () => {
  it("trims from the end only", () => {
    expect(rtrim("   hi   ")).toBe("   hi");
    expect(rtrim("hi//", "/")).toBe("hi");
  });
});
