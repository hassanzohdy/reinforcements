import invert from "./invert";

describe("reinforcements/object/invert", () => {
  it("swaps keys and values", () => {
    expect(invert({ a: 1, b: 2 })).toEqual({ "1": "a", "2": "b" });
    expect(invert({ a: "x", b: "y" })).toEqual({ x: "a", y: "b" });
  });

  it("collides on duplicate values (last wins)", () => {
    expect(invert({ a: 1, b: 1 })).toEqual({ "1": "b" });
  });
});
