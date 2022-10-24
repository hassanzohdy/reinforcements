import { anyValue } from "tests/utils";
import set from "./set";

describe("reinforcements/object/set", () => {
  it("should set the value of the given key", () => {
    const obj = { a: 1, b: 2, c: { d: 3, e: 4 } };
    expect(set(obj, "c.d", 5)).toEqual({ a: 1, b: 2, c: { d: 5, e: 4 } });
  });

  it("should set the value of the given key and create the path if it does not exist", () => {
    const obj = { a: 1, b: 2, c: { d: 3, e: 4 } };
    expect(set(obj, "c.f", 5)).toEqual({ a: 1, b: 2, c: { d: 3, e: 4, f: 5 } });
  });

  it("should update the given array index value", () => {
    const obj = { a: 1, b: 2, c: { d: 3, e: [1, 2] } };
    expect(set(obj, "c.e.0", 5)).toEqual({
      a: 1,
      b: 2,
      c: { d: 3, e: [5, 2] },
    });
  });

  it("should not do anything if the first argument is not a valid object", () => {
    expect(set(anyValue(null), "c.f", 5)).toEqual(null);
  });
});
