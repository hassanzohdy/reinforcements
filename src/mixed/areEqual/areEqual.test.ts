import { orders } from "tests/data";
import clone from "../clone/clone";
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

  it("should return true when comparing two deep nested objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };

    expect(areEqual(obj1, obj2)).toEqual(true);

    const deeperObject = {
      a: {
        b: {
          c: {
            d: {
              e: {
                f: 1,
              },
              m: false,
            },
          },
        },
      },
    };

    expect(areEqual(deeperObject, clone(deeperObject))).toEqual(true);

    const deeperObjectWithNestedArrays = {
      level1: {
        name: "Alice",
        age: 30,
        level2: {
          favoriteFoods: ["pizza", "sushi", "ice cream"],
          level3: {
            address: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
            },
            level4: {
              hobbies: ["reading", "hiking", "painting"],
              level5: {
                friends: [
                  { name: "Bob", age: 32 },
                  { name: "Charlie", age: 29 },
                  { name: "David", age: 31 },
                ],
              },
            },
          },
        },
      },
    };

    expect(
      areEqual(
        deeperObjectWithNestedArrays,
        clone(deeperObjectWithNestedArrays),
      ),
    ).toEqual(true);
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
