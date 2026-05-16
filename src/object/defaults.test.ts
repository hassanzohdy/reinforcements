import defaults from "./defaults";

describe("reinforcements/object/defaults", () => {
  it("fills undefined keys only", () => {
    expect(defaults({ a: 1 }, { a: 2, b: 3 })).toEqual({ a: 1, b: 3 });
  });

  it("merges multiple sources left-to-right", () => {
    expect(defaults({}, { a: 1 }, { a: 2, b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("skips nullish sources", () => {
    expect(defaults({ a: 1 }, undefined, null, { b: 2 })).toEqual({
      a: 1,
      b: 2,
    });
  });
});
