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
});
