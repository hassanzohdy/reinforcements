import { numbers } from "../../tests/data";
import { unknownValue } from "../../tests/utils";
import evenIndexes from "./evenIndexes";

describe("reinforcements/arrays/evenIndexes", () => {
  it("should return an array of even indexes", () => {
    expect(evenIndexes(numbers)).toEqual([1, 3, 5, 7, 9]);
  });

  it("should return an empty array if the given array is empty", () => {
    expect(evenIndexes([])).toEqual([]);
  });

  it("should return an empty array if the given array is not an array", () => {
    expect(evenIndexes(unknownValue(undefined))).toEqual([]);
  });
});
