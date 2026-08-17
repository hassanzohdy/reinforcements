import defaults from "./defaults";

describe("reinforcements/object/defaults", () => {
  it("fills undefined keys only", () => {
    expect(defaults({ a: 1 }, { a: 2, b: 3 })).toEqual({ a: 1, b: 3 });
  });

  it("merges multiple sources left-to-right", () => {
    expect(defaults({}, { a: 1 }, { a: 2, b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it("skips nullish sources", () => {
    expect(defaults({ a: 1 }, undefined, null, { b: 2 })).toEqual({
      a: 1,
      b: 2,
    });
  });

  it("does not pollute the prototype from a __proto__ key in the defaults", () => {
    const target: Record<string, any> = {};
    const result = defaults(
      target,
      JSON.parse('{"__proto__":{"polluted":"x"},"b":2}'),
    );

    expect(({} as any).polluted).toBeUndefined();
    expect(result.polluted).toBeUndefined();
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result).toEqual({ b: 2 });
  });

  it("does not pollute a null-prototype target from a __proto__ key", () => {
    const target: Record<string, any> = Object.create(null);

    defaults(target, JSON.parse('{"__proto__":{"polluted":"x"},"b":2}'));

    expect(Object.prototype.hasOwnProperty.call(target, "__proto__")).toBe(
      false,
    );
    expect(target.b).toBe(2);
  });

  it("does not copy constructor or prototype keys", () => {
    const target: Record<string, any> = {};

    defaults(target, JSON.parse('{"constructor":"x","prototype":"y","b":2}'));

    expect(target).toEqual({ b: 2 });
    expect(target.constructor).toBe(Object);
  });
});
