import mapKeys from "./mapKeys";

describe("reinforcements/object/mapKeys", () => {
  it("renames each key", () => {
    expect(mapKeys({ a: 1, b: 2 }, k => k.toUpperCase())).toEqual({
      A: 1,
      B: 2,
    });
  });

  it("keeps a __proto__ result key as an own key", () => {
    const result: any = mapKeys({ a: { isAdmin: true } }, () => "__proto__");

    expect(result.isAdmin).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(["__proto__"]);
  });
});
