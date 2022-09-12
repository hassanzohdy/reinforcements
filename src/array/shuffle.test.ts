import { unknownValue } from "../../tests/utils";
import shuffle from "./shuffle";

describe("reinforcements/arrays/shuffle", () => {
  it("should shuffle the given array", () => {
    expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("should return the given array if it's empty", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("should return empty array if it's not an array", () => {
    expect(shuffle(unknownValue("test"))).toEqual([]);
  });
});
