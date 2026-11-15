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

  it("evicts the least recently used entry beyond maxSize", () => {
    const fn = vi.fn((n: number) => n * 2);
    const m = memoize(fn, { maxSize: 2 });
    m(1);
    m(2);
    m(1); // refresh 1, so 2 is now the oldest
    m(3); // evicts 2
    expect(fn).toHaveBeenCalledTimes(3);
    m(1);
    m(3);
    expect(fn).toHaveBeenCalledTimes(3);
    m(2);
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it("bounds the cache by default", () => {
    const fn = vi.fn((n: number) => n);
    const m = memoize(fn);
    for (let i = 0; i < 1001; i++) m(i);
    m(0); // the first entry was evicted
    expect(fn).toHaveBeenCalledTimes(1002);
  });

  it("evicts expired ttl entries", () => {
    vi.useFakeTimers();
    try {
      const fn = vi.fn((n: number) => n);
      const m = memoize(fn, { ttl: 100, maxSize: 2 });
      m(1);
      m(2);
      vi.advanceTimersByTime(150);
      m(3); // sweeps 1 and 2
      m(4); // fits without evicting 3
      m(3);
      expect(fn).toHaveBeenCalledTimes(4);
      m(1);
      expect(fn).toHaveBeenCalledTimes(5);
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps undefined and null arguments apart", () => {
    const fn = vi.fn((value: any) => String(value));
    const m = memoize(fn);
    expect(m(undefined)).toBe("undefined");
    expect(m(null)).toBe("null");
    m(undefined);
    m(null);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("calls through without caching when args are cyclic", () => {
    const fn = vi.fn((o: any) => o.name);
    const m = memoize(fn);
    const a: any = { name: "a" };
    a.self = a;
    expect(m(a)).toBe("a");
    expect(m(a)).toBe("a");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("never gives undefined the key of a real string argument", () => {
    const fn = vi.fn((value: any) => typeof value);
    const m = memoize(fn);
    expect(m(undefined)).toBe("undefined");
    expect(m("\u0000u")).toBe("string");
    expect(m("__memoize_undefined__")).toBe("string");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("keeps the plain JSON.stringify key for ordinary arguments", () => {
    const fn = vi.fn((a: string, b: number) => a + b);
    const m = memoize(fn);
    m("u1", 2);
    m.forget(JSON.stringify(["u1", 2]));
    m("u1", 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does not cache with maxSize 0", () => {
    const fn = vi.fn((n: number) => n);
    const m = memoize(fn, { maxSize: 0 });
    m(1);
    m(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("propagates errors from a custom resolver", () => {
    const m = memoize((n: number) => n, {
      resolver: () => {
        throw new Error("bad key");
      },
    });
    expect(() => m(1)).toThrow("bad key");
  });
});
