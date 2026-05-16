import sort from "./sort";

describe("reinforcements/object/sort", () => {
  it("sorts keys alphabetically", () => {
    const out = sort({ b: 1, a: 2, c: 3 });
    expect(Object.keys(out)).toEqual(["a", "b", "c"]);
  });

  it("sorts recursively by default", () => {
    const out = sort({ b: { y: 1, x: 2 }, a: 1 });
    expect(Object.keys(out)).toEqual(["a", "b"]);
    expect(Object.keys((out as any).b)).toEqual(["x", "y"]);
  });

  it("does not descend when recursive is false", () => {
    const out = sort({ b: { y: 1, x: 2 }, a: 1 }, false);
    expect(Object.keys((out as any).b)).toEqual(["y", "x"]);
  });

  it("returns non-objects unchanged", () => {
    expect(sort(42 as any)).toBe(42);
    expect(sort(null as any)).toBe(null);
  });
});
