import mapValues from "./mapValues";

describe("reinforcements/object/mapValues", () => {
  it("transforms each value", () => {
    expect(mapValues({ a: 1, b: 2 }, v => v * 2)).toEqual({ a: 2, b: 4 });
  });

  it("provides the key and original object to the transform", () => {
    expect(mapValues({ a: 1 }, (v, k) => `${k}=${v}`)).toEqual({ a: "a=1" });
  });
});
