import curry from "./curry";

describe("reinforcements/utils/curry", () => {
  it("curries a ternary function", () => {
    const add = curry((a: number, b: number, c: number) => a + b + c);
    expect(add(1)(2)(3)).toBe(6);
    expect(add(1, 2)(3)).toBe(6);
    expect(add(1, 2, 3)).toBe(6);
  });
});
