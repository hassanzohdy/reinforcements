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

  it("never descends into inherited members or touches built-ins", () => {
    const hasOwnCall = Object.prototype.hasOwnProperty.call;

    try {
      set({}, "hasOwnProperty.call", "x");
      set({}, "toString.polluted", 1);
      set([], "push.x", 1);

      expect((Object.prototype.hasOwnProperty as any).call).toBe(hasOwnCall);
      expect(({} as any).toString.polluted).toBeUndefined();
      expect((Array.prototype.push as any).x).toBeUndefined();
      expect((Object.prototype as any).polluted).toBeUndefined();
    } finally {
      // deleting the own `call` (if one was written) restores the inherited one
      delete (Object.prototype.hasOwnProperty as any).call;
      delete (Object.prototype.toString as any).polluted;
      delete (Array.prototype.push as any).x;
    }
  });

  it("shadows an inherited member with an own container", () => {
    const object: Record<string, any> = {};

    set(object, "toString.x", 1);

    expect(Object.keys(object)).toEqual(["toString"]);
    expect(object.toString).toEqual({ x: 1 });
    expect(Object.prototype.toString.call({})).toBe("[object Object]");
  });

  it("returns the object untouched when a segment is a primitive", () => {
    const object: Record<string, any> = { a: 1, s: "str" };

    expect(set(object, "a.b", 2)).toEqual({ a: 1, s: "str" });
    expect(set(object, "s.0", 1)).toEqual({ a: 1, s: "str" });
  });

  it("returns the object untouched when a segment is a function", () => {
    const fn = () => 1;
    const object: Record<string, any> = { fn };

    expect(set(object, "fn.x", 1)).toEqual({ fn });
    expect((fn as any).x).toBeUndefined();
  });

  it("should create an array for a numeric segment up to the limit", () => {
    expect(Array.isArray((set({}, "a.10000", "x") as any).a)).toBe(true);
    expect(Array.isArray((set({}, "a.0", "x") as any).a)).toBe(true);
  });

  it("should create a plain object, not a sparse array, above the limit", () => {
    const result: any = set({}, "a.4294967294", "x");

    expect(Array.isArray(result.a)).toBe(false);
    expect(result).toEqual({ a: { "4294967294": "x" } });

    const nested: any = set({}, "a.10001.b", "x");

    expect(Array.isArray(nested.a)).toBe(false);
    expect(nested.a["10001"].b).toBe("x");
  });

  it("should still write a large index into an existing array", () => {
    const list: any[] = [];

    set({ list }, "list.20000", "x");

    expect(list.length).toBe(20001);
  });
});
