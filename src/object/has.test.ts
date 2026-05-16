import has from "./has";

describe("reinforcements/object/has", () => {
  it("returns true when path exists", () => {
    expect(has({ a: { b: 1 } }, "a.b")).toBe(true);
  });

  it("returns true for keys with undefined value", () => {
    expect(has({ a: { b: undefined } }, "a.b")).toBe(true);
  });

  it("returns false when path is missing", () => {
    expect(has({ a: {} }, "a.b")).toBe(false);
    expect(has({}, "x")).toBe(false);
    expect(has(null as any, "x")).toBe(false);
  });
});
