import { users } from "tests/data";
import { anyValue } from "tests/utils";
import pluck from "./pluck";

describe("reinforcements/arrays/pluck", () => {
  it("should return an array of values", () => {
    expect(pluck(users, "name")).toEqual([
      "John",
      "Jane",
      "Jack",
      "Jill",
      "Joe",
      "Jenny",
      "Jen",
      "Jenna",
    ]);
  });

  it("should return an array of objects", () => {
    expect(pluck(users, ["name"])).toEqual([
      { name: "John" },
      { name: "Jane" },
      { name: "Jack" },
      { name: "Jill" },
      { name: "Joe" },
      { name: "Jenny" },
      { name: "Jen" },
      { name: "Jenna" },
    ]);
  });

  it("should return an empty array if the given array is empty", () => {
    expect(pluck([])).toEqual([]);
  });

  it("should return an empty array if the given array is not an array", () => {
    expect(pluck(anyValue(undefined))).toEqual([]);
  });
});
