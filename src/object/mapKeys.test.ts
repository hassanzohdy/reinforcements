import mapKeys from "./mapKeys";

describe("reinforcements/object/mapKeys", () => {
  it("renames each key", () => {
    expect(mapKeys({ a: 1, b: 2 }, k => k.toUpperCase())).toEqual({
      A: 1,
      B: 2,
    });
  });
});
