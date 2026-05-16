import memoize from "./memoize";

describe("reinforcements/utils/memoize", () => {
  it("caches by argument signature", () => {
    const fn = vi.fn((n: number) => n * 2);
    const m = memoize(fn);
    m(2);
    m(2);
    m(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("clear() empties the cache", () => {
    const fn = vi.fn((n: number) => n);
    const m = memoize(fn);
    m(1);
    m.clear();
    m(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("supports a custom resolver", () => {
    const fn = vi.fn((a: any, b: any) => a + b);
    const m = memoize(fn, { resolver: (a, b) => `${a}-${b}` });
    m(1, 2);
    m(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
