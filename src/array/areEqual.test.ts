import { orders } from "../../tests/data";
import areEqual from "./areEqual";

describe("reinforcements/arrays/areEqual", () => {
  it("should return true if the given arrays are equal in values", () => {
    expect(areEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(areEqual([1, 2, 3], [3, 2, 1])).toEqual(true);
    expect(areEqual(orders, [...orders])).toEqual(true);
    expect(areEqual([], [])).toEqual(true);
  });

  it("should return false if the given arrays are not equal in values", () => {
    expect(areEqual([1, 2, 3], [1, 2, 3, 4])).toEqual(false);
    expect(areEqual([1, 2, 3], [1, 2])).toEqual(false);
  });
});
