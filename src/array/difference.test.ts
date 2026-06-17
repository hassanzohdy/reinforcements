import difference from "./difference";

describe("reinforcements/array/difference", () => {
  it("removes values found in the other arrays", () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it("accepts multiple exclusion arrays", () => {
    expect(difference([1, 2, 3], [2], [3])).toEqual([1]);
  });

  it("dedupes the result", () => {
    expect(difference([1, 1, 2], [3])).toEqual([1, 2]);
  });

  it("returns [] for a non-array first argument", () => {
    expect(difference(null as any, [1])).toEqual([]);
  });
});
