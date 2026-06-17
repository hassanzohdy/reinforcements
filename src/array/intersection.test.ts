import intersection from "./intersection";

describe("reinforcements/array/intersection", () => {
  it("returns values present in every array", () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 2])).toEqual([2, 3]);
  });

  it("dedupes and follows the first array's order", () => {
    expect(intersection([3, 2, 2, 1], [1, 2, 3])).toEqual([3, 2, 1]);
  });

  it("returns [] when no arrays are given", () => {
    expect(intersection()).toEqual([]);
  });

  it("returns [] when there is no common value", () => {
    expect(intersection([1], [2])).toEqual([]);
  });
});
