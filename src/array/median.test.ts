import { unknownValue } from "../../tests/utils";
import median from "./median";

describe("reinforcements/arrays/median", () => {
  it("should return the median of the given array", () => {
    expect(median([1, 2, 3])).toEqual(2);
    expect(median([1, 2, 3, 4])).toEqual(2.5);
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([1, 2, 3, 4, 5, 6])).toEqual(3.5);
    expect(median([1, 2, 3, 4, 5, 6, 7])).toEqual(4);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(4.5);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(5);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5.5);
  });

  it("should return the median of the given array of numbers", () => {
    expect(median([1, 2, 3])).toEqual(2);
    expect(median([1, 2, 3, 4])).toEqual(2.5);
    expect(median([1, 2, 3, 4, 5])).toEqual(3);
    expect(median([1, 2, 3, 4, 5, 6])).toEqual(3.5);
    expect(median([1, 2, 3, 4, 5, 6, 7])).toEqual(4);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(4.5);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(5);
    expect(median([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(5.5);
  });

  it("should return zero if the given array is empty", () => {
    expect(median([])).toEqual(0);
  });

  it("should return zero if the given value is not array", () => {
    expect(median(unknownValue(undefined))).toEqual(0);
    expect(median(unknownValue(""))).toEqual(0);
    expect(median(unknownValue(null))).toEqual(0);
    expect(median(unknownValue(0))).toEqual(0);
    expect(median(unknownValue(true))).toEqual(0);
    expect(median(unknownValue(false))).toEqual(0);
    expect(median(unknownValue({}))).toEqual(0);
    expect(median(unknownValue(new Set()))).toEqual(0);
  });

  it("should return the median of the given array of objects", () => {
    expect(median([{ age: 10 }, { age: 20 }, { age: 30 }], "age")).toEqual(20);
    expect(
      median([{ age: 10 }, { age: 20 }, { age: 30 }, { age: 40 }], "age"),
    ).toEqual(25);
    expect(
      median(
        [{ age: 10 }, { age: 20 }, { age: 30 }, { age: 40 }, { age: 50 }],
        "age",
      ),
    ).toEqual(30);
    expect(
      median(
        [
          { age: 10 },
          { age: 20 },
          { age: 30 },
          { age: 40 },
          { age: 50 },
          { age: 60 },
        ],
        "age",
      ),
    ).toEqual(35);
    expect(
      median(
        [
          { age: 10 },
          { age: 20 },
          { age: 30 },
          { age: 40 },
          { age: 50 },
          { age: 60 },
          { age: 70 },
        ],
        "age",
      ),
    ).toEqual(40);
    expect(
      median(
        [
          { age: 10 },
          { age: 20 },
          { age: 30 },
          { age: 40 },
          { age: 50 },
          { age: 60 },
          { age: 70 },
          { age: 80 },
        ],
        "age",
      ),
    ).toEqual(45);
    expect(
      median(
        [
          { age: 10 },
          { age: 20 },
          { age: 30 },
          { age: 40 },
          { age: 50 },
          { age: 60 },
          { age: 70 },
          { age: 80 },
          { age: 90 },
        ],
        "age",
      ),
    ).toEqual(50);
    expect(
      median(
        [
          { age: 10 },
          { age: 20 },
          { age: 30 },
          { age: 40 },
          { age: 50 },
          { age: 60 },
          { age: 70 },
          { age: 80 },
          { age: 90 },
          { age: 100 },
        ],
        "age",
      ),
    ).toEqual(55);
  });

  it("should return zero if the given array is not an array of numbers", () => {
    expect(median(["1", "2", "3"])).toEqual(0);
    expect(median(["1", "2", "3", "4"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7", "8"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7", "8", "9"])).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])).toEqual(
      0,
    );
  });

  it("should return zero if the given array is not an array of objects", () => {
    expect(median(["1", "2", "3"], "age")).toEqual(0);
    expect(median(["1", "2", "3", "4"], "age")).toEqual(0);
    expect(median(["1", "2", "3", "4", "5"], "age")).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6"], "age")).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7"], "age")).toEqual(0);
    expect(median(["1", "2", "3", "4", "5", "6", "7", "8"], "age")).toEqual(0);
    expect(
      median(["1", "2", "3", "4", "5", "6", "7", "8", "9"], "age"),
    ).toEqual(0);
    expect(
      median(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "age"),
    ).toEqual(0);
  });
});
