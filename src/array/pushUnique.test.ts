import pushUnique from "./pushUnique";

describe("reinforcements/arrays/pushUnique", () => {
  it("should push the given values to the array if and only if the value doesn't exists in the array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(pushUnique(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushUnique(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushUnique(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(pushUnique(array, 11, 12, 13, 14, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
  });

  it("should skip duplicates inside the given items and keep order", () => {
    expect(pushUnique([1], 2, 2, 1, 3)).toEqual([1, 2, 3]);
  });
});
