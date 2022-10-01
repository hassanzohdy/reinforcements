import { orders } from "tests/data";
import areEqual from "./areEqual";

describe("reinforcements/mixed/areEqual", () => {
  it("should return true if the given values are equal in values", () => {
    expect(areEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(areEqual([1, 2, 3], [3, 2, 1])).toEqual(true);
    expect(areEqual(orders, [...orders])).toEqual(true);
    expect(areEqual([], [])).toEqual(true);
    expect(areEqual(null, null)).toEqual(true);
    expect(areEqual(undefined, undefined)).toEqual(true);
  });

  it("should return false if the given values are not equal in values", () => {
    expect(areEqual([1, 2, 3], [1, 2, 3, 4])).toEqual(false);
    expect(areEqual([1, 2, 3], [1, 2])).toEqual(false);
    expect(areEqual(2, "2")).toEqual(false);
    expect(areEqual(null, false)).toEqual(false);
    expect(areEqual(null, undefined)).toEqual(false);
    expect(areEqual(undefined, 0)).toEqual(false);
    expect(areEqual("", 0)).toEqual(false);
    expect(areEqual(Symbol("a"), Symbol("a"))).toEqual(false);
  });
});
