import debounceAsync from "./debounceAsync";

describe("reinforcements/async/debounceAsync", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("collapses bursts into a single invocation and shares the result", async () => {
    const fn = vi.fn(async (q: string) => `r:${q}`);
    const debounced = debounceAsync(fn, 100);

    const a = debounced("a");
    const b = debounced("b");
    const c = debounced("c");

    vi.advanceTimersByTime(100);

    const [ra, rb, rc] = await Promise.all([a, b, c]);
    expect(ra).toBe("r:c");
    expect(rb).toBe("r:c");
    expect(rc).toBe("r:c");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
