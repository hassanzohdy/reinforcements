import pick from "./pick";

describe("reinforcements/object/pick", () => {
  it("picks specified keys", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("supports dot-notation paths", () => {
    expect(pick({ a: { b: 1, c: 2 } }, ["a.b"])).toEqual({ a: { b: 1 } });
  });

  it("accepts a predicate", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, v => v > 1)).toEqual({ b: 2, c: 3 });
  });

  it("returns empty for non-objects", () => {
    expect(pick(null as any, ["a"])).toEqual({});
  });
});
