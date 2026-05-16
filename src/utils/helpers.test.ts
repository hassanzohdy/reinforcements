import constant from "./constant";
import identity from "./identity";
import negate from "./negate";
import noop from "./noop";

describe("reinforcements/utils helpers", () => {
  it("noop returns undefined", () => {
    expect(noop()).toBeUndefined();
  });

  it("identity returns the argument", () => {
    expect(identity(42)).toBe(42);
    const obj = { a: 1 };
    expect(identity(obj)).toBe(obj);
  });

  it("constant always returns the given value", () => {
    const always = constant(7);
    expect(always()).toBe(7);
    expect(always()).toBe(7);
  });

  it("negate inverts a predicate", () => {
    const isEven = (n: number) => n % 2 === 0;
    expect(negate(isEven)(3)).toBe(true);
    expect(negate(isEven)(2)).toBe(false);
  });
});
