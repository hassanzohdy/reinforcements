import coalesce from "./coalesce";

describe("reinforcements/mixed/coalesce", () => {
  it("returns the first non-nullish value", () => {
    expect(coalesce(null, undefined, "x")).toBe("x");
    expect(coalesce(undefined, 0, "x")).toBe(0);
    expect(coalesce(undefined, "", "x")).toBe("");
  });

  it("returns undefined when all values are nullish", () => {
    expect(coalesce(null, undefined)).toBeUndefined();
  });
});
