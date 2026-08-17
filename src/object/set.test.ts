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

  it("should reject __proto__ paths instead of polluting the prototype", () => {
    const object: Record<string, any> = {};

    expect(set(object, "__proto__.polluted", "x")).toBe(object);
    expect(object).toEqual({});
    expect(anyValue({}).polluted).toBeUndefined();
  });

  it("should reject constructor.prototype paths", () => {
    const object: Record<string, any> = {};

    expect(set(object, "constructor.prototype.polluted", "x")).toBe(object);
    expect(object).toEqual({});
    expect(anyValue({}).polluted).toBeUndefined();
  });

  it("should reject a forbidden segment anywhere in the path without creating containers", () => {
    const object: Record<string, any> = {};

    set(object, "a.__proto__.polluted", "x");
    set(object, "a.b.prototype.polluted", "x");

    expect(object).toEqual({});
    expect(anyValue({}).polluted).toBeUndefined();
  });

  it("should still set legitimate paths", () => {
    expect(set({}, "a.b.c", 1)).toEqual({ a: { b: { c: 1 } } });
    expect(set({}, "users.0.name", "Ada")).toEqual({
      users: [{ name: "Ada" }],
    });
  });
});
