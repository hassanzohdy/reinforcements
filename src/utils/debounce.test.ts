import debounce from "./debounce";

describe("reinforcements/utils/debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("invokes once after the wait window with the last args", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced("a");
    debounced("b");
    debounced("c");
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("supports leading-edge invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { leading: true, trailing: false });
    debounced("a");
    expect(fn).toHaveBeenCalledWith("a");
    debounced("b");
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancel() clears a pending call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced("a");
    expect(debounced.pending()).toBe(true);
    debounced.cancel();
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();
    expect(debounced.pending()).toBe(false);
  });

  it("flush() invokes the pending call immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced("a");
    debounced.flush();
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("maxWait forces invocation after the cap", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50, { maxWait: 100 });
    debounced("a");
    vi.advanceTimersByTime(40);
    debounced("b");
    vi.advanceTimersByTime(40);
    debounced("c");
    vi.advanceTimersByTime(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
