import compact from "./compact";

describe("reinforcements/object/compact", () => {
  it("drops null, undefined, and empty string by default", () => {
    expect(
      compact({
        name: "Ada",
        email: "",
        phone: null,
        role: undefined,
        age: 36,
      }),
    ).toEqual({ name: "Ada", age: 36 });
  });

  it("keeps falsy-but-meaningful values (0, false, NaN)", () => {
    expect(compact({ a: 0, b: false, c: NaN, d: null, e: undefined })).toEqual({
      a: 0,
      b: false,
      c: NaN,
    });
  });

  it("drops empty arrays and empty objects by default", () => {
    expect(compact({ tags: [], meta: {}, name: "Ada" })).toEqual({
      name: "Ada",
    });
  });

  it("recursively cleans nested objects", () => {
    expect(
      compact({
        user: { name: "Ada", email: "" },
        meta: { tags: [] },
        keep: "yes",
      }),
    ).toEqual({
      user: { name: "Ada" },
      keep: "yes",
    });
  });

  it("drops parent containers that become empty after recursion", () => {
    expect(compact({ user: { email: "", phone: null } })).toEqual({});
  });

  it("cleans arrays of primitives", () => {
    expect(compact(["a", "", null, "b", undefined])).toEqual(["a", "b"]);
  });

  it("recursively cleans arrays of objects", () => {
    expect(
      compact([{ name: "Ada", email: "" }, { name: "", email: "x@y.z" }, {}]),
    ).toEqual([{ name: "Ada" }, { email: "x@y.z" }]);
  });

  it("can be configured to keep empties", () => {
    expect(compact({ tags: [], name: "Ada" }, { empties: false })).toEqual({
      tags: [],
      name: "Ada",
    });
  });

  it("can be configured shallow", () => {
    expect(
      compact({ user: { name: "Ada", email: "" } }, { deep: false }),
    ).toEqual({ user: { name: "Ada", email: "" } });
  });

  it("supports a custom predicate", () => {
    expect(
      compact({ a: 0, b: 1, c: -1, d: -1 }, { predicate: v => v === -1 }),
    ).toEqual({ a: 0, b: 1 });
  });

  it("does not mutate the input", () => {
    const input = { a: 1, b: "", c: { d: null } };
    compact(input);

    expect(input).toEqual({ a: 1, b: "", c: { d: null } });
  });

  it("returns primitives unchanged", () => {
    expect(compact("hello" as any)).toBe("hello");
    expect(compact(42 as any)).toBe(42);
    expect(compact(null as any)).toBe(null);
  });

  const deepJson = () =>
    JSON.parse('{"a":'.repeat(3000) + "1" + "}".repeat(3000));
  const protoJson = () =>
    JSON.parse('{"__proto__":{"isAdmin":true},"name":"x"}');

  it("keeps an own __proto__ key as an own key", () => {
    const result: any = compact(protoJson());

    expect(result.isAdmin).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(["__proto__", "name"]);
  });

  it("throws a clear error for input nested deeper than 256 levels", () => {
    expect(() => compact(deepJson())).toThrow(/nested deeper than 256 levels/);
  });

  it("throws a clear error for circular input", () => {
    const object: any = { b: 1 };

    object.self = object;

    expect(() => compact(object)).toThrow(/circular reference/);
  });
});
