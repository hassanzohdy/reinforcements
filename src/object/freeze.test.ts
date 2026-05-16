import freeze from "./freeze";

describe("reinforcements/object/freeze", () => {
  it("recursively freezes plain objects and arrays", () => {
    const frozen = freeze({ a: { b: [1, 2] } });
    expect(Object.isFrozen(frozen)).toBe(true);
    expect(Object.isFrozen(frozen.a)).toBe(true);
    expect(Object.isFrozen(frozen.a.b)).toBe(true);
  });

  it("returns primitives unchanged", () => {
    expect(freeze(42 as any)).toBe(42);
    expect(freeze("hi" as any)).toBe("hi");
  });
});
