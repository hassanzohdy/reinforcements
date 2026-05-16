import omit from "./omit";

describe("reinforcements/object/omit", () => {
  it("removes specified keys", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
  });

  it("supports dot-notation paths", () => {
    expect(omit({ a: { b: 1, c: 2 } }, ["a.b"])).toEqual({ a: { c: 2 } });
  });

  it("accepts a predicate", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, (_, key) => key === "b")).toEqual({
      a: 1,
      c: 3,
    });
  });

  it("does not mutate the input", () => {
    const obj = { a: 1, b: 2 };
    omit(obj, ["a"]);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
