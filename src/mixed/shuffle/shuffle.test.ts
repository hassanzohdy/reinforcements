import { anyValue } from "tests/utils";
import shuffle from "./shuffle";

describe("reinforcements/mixed/shuffle", () => {
  it("should shuffle the given array", () => {
    expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("should return the given array if it's empty", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("should return shuffled string characters if it's a string", () => {
    const newShuffledString = shuffle("test");

    expect(typeof newShuffledString).toBe("string");
  });

  it("should return same value if it's not an array or string", () => {
    expect(shuffle("")).toEqual("");
    expect(shuffle(anyValue(123))).toEqual(123);
  });
});
