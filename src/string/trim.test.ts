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

describe("reinforcements/string/trim (needles and performance)", () => {
  it("repeats the whole multi-character needle", () => {
    expect(trim("ababXab", "ab")).toBe("X");
    expect(ltrim("abbbb-x", "ab")).toBe("bbb-x");
    expect(rtrim("Xabab", "ab")).toBe("X");
  });

  it("returns the string unchanged for an empty needle", () => {
    expect(trim("abc", "")).toBe("abc");
    expect(ltrim("abc", "")).toBe("abc");
    expect(rtrim("abc", "")).toBe("abc");
  });

  it("treats regex characters literally", () => {
    expect(trim("..a.b..", ".")).toBe("a.b");
    expect(trim("aaa", "aa")).toBe("a");
    expect(trim("abab", "ab")).toBe("");
  });

  it("is linear on a long interior run", () => {
    const input = "x" + " ".repeat(50000) + "y";
    const started = performance.now();

    expect(trim(input)).toBe(input);
    expect(trim("--x" + "-".repeat(50000) + "y--", "-")).toBe(
      "x" + "-".repeat(50000) + "y",
    );
    expect(ltrim(input)).toBe(input);
    expect(rtrim(input)).toBe(input);
    expect(rtrim(input, "ab")).toBe(input);

    expect(performance.now() - started).toBeLessThan(200);
  });
});
