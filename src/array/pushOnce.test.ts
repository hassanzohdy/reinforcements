import pushOnce from "./pushOnce";

describe("reinforcements/arrays/pushOnce", () => {
  it("should push the given values to the array if and only if the value doesn't exists in the array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(pushOnce(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushOnce(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushOnce(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushOnce(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
  });
});
