import after from "./after";
import before from "./before";
import once from "./once";

describe("reinforcements/utils/once", () => {
  it("invokes the underlying function exactly once", () => {
    const fn = vi.fn(() => 42);
    const wrapped = once(fn);
    expect(wrapped()).toBe(42);
    expect(wrapped()).toBe(42);
    expect(wrapped()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("reinforcements/utils/after", () => {
  it("invokes only after n calls", () => {
    const fn = vi.fn();
    const wrapped = after(3, fn);
    wrapped();
    wrapped();
    expect(fn).not.toHaveBeenCalled();
    wrapped();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("reinforcements/utils/before", () => {
  it("invokes up to n times", () => {
    const fn = vi.fn((x: number) => x * 2);
    const wrapped = before(2, fn);
    expect(wrapped(1)).toBe(2);
    expect(wrapped(2)).toBe(4);
    expect(wrapped(3)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
