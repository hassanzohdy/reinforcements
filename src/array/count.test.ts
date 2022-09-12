import { unknownValue } from "../../tests/utils";
import { count } from "./count";

describe("reinforcements/arrays/count", () => {
  it("should count the items of the given array", () => {
    expect(count([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], () => true)).toEqual(10);
    expect(count([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], () => false)).toEqual(0);
    expect(
      count([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (number: number) => number > 5),
    ).toEqual(5);
  });

  it("should count the items of the given array by the given key", () => {
    expect(
      count([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }], "id"),
    ).toEqual(5);
    expect(
      count([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }], "name"),
    ).toEqual(0);

    expect(
      count(
        [{ id: 1, name: "John" }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        "name",
      ),
    ).toEqual(1);
  });

  it("should count the items of the given array by the given callback", () => {
    expect(
      count(
        [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        (item: { id: number }) => item.id > 2,
      ),
    ).toEqual(3);
  });

  it("should return 0 if the given data is not an array", () => {
    expect(count(unknownValue(null), "missingKey")).toEqual(0);
    expect(count(unknownValue(null), () => true)).toEqual(0);
    expect(count(unknownValue(undefined), () => true)).toEqual(0);
    expect(count(unknownValue({}), () => true)).toEqual(0);
    expect(count(unknownValue(""), () => true)).toEqual(0);
    expect(count(unknownValue(0), () => true)).toEqual(0);
    expect(count(unknownValue(false), () => true)).toEqual(0);
  });
});
