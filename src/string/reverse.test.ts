import reverse from "./reverse";

describe("reinforcements/string/reverse", () => {
  it("reverses ASCII", () => {
    expect(reverse("hello")).toBe("olleh");
  });

  it("returns empty for empty input", () => {
    expect(reverse("")).toBe("");
  });

  it("is unicode-safe", () => {
    expect(reverse("ab")).toBe("ba");
  });
});
