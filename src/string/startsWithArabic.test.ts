import containsArabic from "./containsArabic";
import startsWithArabic, { ARABIC_REGEX } from "./startsWithArabic";

describe("reinforcements/string/startsWithArabic", () => {
  it("detects leading Arabic chars", () => {
    expect(startsWithArabic("مرحبا")).toBe(true);
    expect(startsWithArabic("hello")).toBe(false);
  });

  it("respects the trimmed flag", () => {
    expect(startsWithArabic("   مرحبا")).toBe(true);
    expect(startsWithArabic("   مرحبا", false)).toBe(false);
  });

  it("exports a valid ARABIC_REGEX", () => {
    expect(ARABIC_REGEX.test("ا")).toBe(true);
    expect(ARABIC_REGEX.test("a")).toBe(false);
  });
});

describe("reinforcements/string/containsArabic", () => {
  it("returns true when any Arabic char is present", () => {
    expect(containsArabic("hello مرحبا")).toBe(true);
    expect(containsArabic("hello")).toBe(false);
  });
});
