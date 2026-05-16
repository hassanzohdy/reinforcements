import { orders } from "tests/data";
import clone from "../clone/clone";
import areEqual from "./areEqual";

describe("reinforcements/mixed/areEqual", () => {
  it("should return true for equal values", () => {
    expect(areEqual([1, 2, 3], [1, 2, 3])).toEqual(true);
    expect(areEqual(orders, [...orders])).toEqual(true);
    expect(areEqual([], [])).toEqual(true);
    expect(areEqual(null, null)).toEqual(true);
    expect(areEqual(undefined, undefined)).toEqual(true);
  });

  it("should respect element order in arrays", () => {
    expect(areEqual([1, 2, 3], [3, 2, 1])).toEqual(false);
  });

  it("should return true for deep nested objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 1 } } };

    expect(areEqual(obj1, obj2)).toEqual(true);

    const deep = {
      a: { b: { c: { d: { e: { f: 1 }, m: false } } } },
    };

    expect(areEqual(deep, clone(deep))).toEqual(true);

    const nestedArrays = {
      level1: {
        name: "Alice",
        favoriteFoods: ["pizza", "sushi"],
        friends: [
          { name: "Bob", age: 32 },
          { name: "Charlie", age: 29 },
        ],
      },
    };

    expect(areEqual(nestedArrays, clone(nestedArrays))).toEqual(true);
  });

  it("should not mutate its inputs", () => {
    const a = [3, 1, 2];
    const b = [3, 1, 2];
    areEqual(a, b);
    expect(a).toEqual([3, 1, 2]);
    expect(b).toEqual([3, 1, 2]);
  });

  it("should handle Date, RegExp, Map, Set", () => {
    expect(areEqual(new Date(0), new Date(0))).toEqual(true);
    expect(areEqual(/abc/g, /abc/g)).toEqual(true);
    expect(areEqual(new Map([["a", 1]]), new Map([["a", 1]]))).toEqual(true);
    expect(areEqual(new Set([1, 2]), new Set([2, 1]))).toEqual(true);
  });

  it("should handle circular references", () => {
    const a: any = { x: 1 };
    a.self = a;
    const b: any = { x: 1 };
    b.self = b;
    expect(areEqual(a, b)).toEqual(true);
  });

  it("should return false for non-equal values", () => {
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
