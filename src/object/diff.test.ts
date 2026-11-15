import diff from "./diff";

describe("reinforcements/object/diff", () => {
  it("reports added, removed, and changed keys", () => {
    const result = diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
    expect(result).toEqual({
      added: { c: 4 },
      removed: {},
      changed: { b: { from: 2, to: 3 } },
    });
  });

  it("reports removed keys", () => {
    expect(diff({ a: 1, b: 2 }, { a: 1 })).toEqual({
      added: {},
      removed: { b: 2 },
      changed: {},
    });
  });

  it("treats nested structurally equal values as unchanged", () => {
    const result = diff({ user: { name: "Ada" } }, { user: { name: "Ada" } });
    expect(result).toEqual({ added: {}, removed: {}, changed: {} });
  });

  it("does not treat inherited keys as present", () => {
    expect(diff({}, { toString: 1 })).toEqual({
      added: { toString: 1 },
      removed: {},
      changed: {},
    });
    expect(diff({ toString: 1 }, {})).toEqual({
      added: {},
      removed: { toString: 1 },
      changed: {},
    });
  });

  it("keeps an own __proto__ key as an own key", () => {
    const result = diff({}, JSON.parse('{"__proto__":{"isAdmin":true}}'));

    expect(Object.keys(result.added)).toEqual(["__proto__"]);
    expect((result.added as any).isAdmin).toBeUndefined();
  });

  it("throws a clear error for input nested deeper than 256 levels", () => {
    const deep = () =>
      JSON.parse('{"a":'.repeat(3000) + "1" + "}".repeat(3000));

    expect(() => diff({ x: deep() }, { x: deep() })).toThrow(
      /nested deeper than 256 levels/,
    );
  });
});
