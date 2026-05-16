import clamp from "./clamp";
import inRange from "./inRange";
import lerp from "./lerp";

describe("reinforcements/number/clamp", () => {
  it("clamps to range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("normalizes swapped bounds", () => {
    expect(clamp(5, 10, 0)).toBe(5);
  });
});

describe("reinforcements/number/inRange", () => {
  it("includes the bounds by default", () => {
    expect(inRange(0, 0, 10)).toBe(true);
    expect(inRange(10, 0, 10)).toBe(true);
  });

  it("respects the exclusive flag", () => {
    expect(inRange(10, 0, 10, { inclusive: false })).toBe(false);
  });
});

describe("reinforcements/number/lerp", () => {
  it("interpolates linearly", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });
});
