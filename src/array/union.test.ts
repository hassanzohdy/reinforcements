import union from "./union";

describe("reinforcements/array/union", () => {
  it("merges arrays and dedupes preserving order", () => {
    expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("ignores non-array inputs", () => {
    expect(union([1], null as any, [2])).toEqual([1, 2]);
  });

  it("returns [] with no arguments", () => {
    expect(union()).toEqual([]);
  });
});
