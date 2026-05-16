import map from "./map";

describe("reinforcements/object/map", () => {
  it("maps an object to an array via the callback", () => {
    expect(map({ a: 1, b: 2 }, (k, v) => `${k}=${v}`)).toEqual(["a=1", "b=2"]);
  });
});
