import mapValues from "./mapValues";

describe("reinforcements/object/mapValues", () => {
  it("transforms each value", () => {
    expect(mapValues({ a: 1, b: 2 }, v => v * 2)).toEqual({ a: 2, b: 4 });
  });

  it("provides the key and original object to the transform", () => {
    expect(mapValues({ a: 1 }, (v, k) => `${k}=${v}`)).toEqual({ a: "a=1" });
  });

  it("keeps an own __proto__ key as an own key", () => {
    const result: any = mapValues(
      JSON.parse('{"__proto__":{"isAdmin":true},"name":"x"}'),
      value => value,
    );

    expect(result.isAdmin).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(["__proto__", "name"]);
  });
});
