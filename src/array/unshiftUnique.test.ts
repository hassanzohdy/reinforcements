import unshiftUnique from "./unshiftUnique";

describe("reinforcements/arrays/unshiftUnique", () => {
  it("should prepend once one or more values to the array if and only if the value doesn't exists in the array", () => {
    const array = [1, 2, 3];
    const result = unshiftUnique(array, 4, 5, 6);
    expect(result).toEqual([6, 5, 4, 1, 2, 3]);
  });
});
