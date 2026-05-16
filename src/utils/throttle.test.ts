import throttle from "./throttle";

describe("reinforcements/utils/throttle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("invokes leading by default", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled("a");
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("throttles bursts", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled("a");
    throttled("b");
    throttled("c");
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("c");
  });

  it("cancel() clears pending trailing call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled("a");
    throttled("b");
    throttled.cancel();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
