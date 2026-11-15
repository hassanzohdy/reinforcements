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

  const deepJson = () =>
    JSON.parse('{"a":'.repeat(3000) + "1" + "}".repeat(3000));

  it("throws a clear error for input nested deeper than 256 levels", () => {
    expect(() => freeze(deepJson())).toThrow(/nested deeper than 256 levels/);
  });

  it("freezes circular input without overflowing", () => {
    const object: any = { child: {} };

    object.child.parent = object;

    freeze(object);

    expect(Object.isFrozen(object)).toBe(true);
    expect(Object.isFrozen(object.child)).toBe(true);
  });
});
