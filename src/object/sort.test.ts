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

  const deepJson = () =>
    JSON.parse('{"a":'.repeat(3000) + "1" + "}".repeat(3000));
  const protoJson = () =>
    JSON.parse('{"__proto__":{"isAdmin":true},"name":"x"}');

  it("keeps an own __proto__ key as an own key", () => {
    const result: any = sort(protoJson());

    expect(result.isAdmin).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(["__proto__", "name"]);
  });

  it("throws a clear error for input nested deeper than 256 levels", () => {
    expect(() => sort(deepJson())).toThrow(/nested deeper than 256 levels/);
  });

  it("throws a clear error for circular input", () => {
    const object: any = { b: 1 };

    object.self = object;

    expect(() => sort(object)).toThrow(/circular reference/);
  });
});
