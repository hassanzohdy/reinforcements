import sleep from "./sleep";

describe("reinforcements/async/sleep", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves after the given ms", async () => {
    const promise = sleep(100, "ok");
    vi.advanceTimersByTime(100);
    await expect(promise).resolves.toBe("ok");
  });
});
