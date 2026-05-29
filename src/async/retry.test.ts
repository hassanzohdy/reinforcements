import Random from "../Random/random";
import retry, { retryable } from "./retry";
import sleep from "./sleep";

// Mock sleep so backoff/jitter delays are captured and resolve instantly.
// The AbortSignal path uses a raw setTimeout (not this), so abort timing
// tests still exercise real timers.
vi.mock("./sleep", () => ({ default: vi.fn(() => Promise.resolve()) }));

const sleepMock = vi.mocked(sleep);
const delays = () => sleepMock.mock.calls.map(call => call[0]);

describe("reinforcements/async/retry", () => {
  beforeEach(() => {
    sleepMock.mockClear();
    Random.seed(); // restore Math.random between tests
  });

  // ── Defaults (unchanged behaviour) ──────────────────────────────

  it("returns the first successful value", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    expect(await retry(fn)).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries until success", async () => {
    let calls = 0;
    const fn = vi.fn(async () => {
      calls++;
      if (calls < 3) throw new Error("nope");
      return "ok";
    });
    expect(await retry(fn, { attempts: 5 })).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("throws the last error after exhausting attempts", async () => {
    const err = new Error("boom");
    const fn = vi.fn().mockRejectedValue(err);
    await expect(retry(fn, { attempts: 2 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // ── Feature 1: shouldRetry ──────────────────────────────────────

  it("stops immediately when shouldRetry returns false", async () => {
    const err = new Error("4xx");
    const fn = vi.fn().mockRejectedValue(err);
    await expect(
      retry(fn, { attempts: 5, shouldRetry: () => false }),
    ).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(delays()).toEqual([]); // no delay when bailing
  });

  it("supports an async shouldRetry predicate", async () => {
    const err = new Error("nope");
    const fn = vi.fn().mockRejectedValue(err);
    const shouldRetry = vi.fn(async (_e: unknown, attempt: number) => attempt < 2);
    await expect(retry(fn, { attempts: 5, shouldRetry })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(2); // attempt 1 retries, attempt 2 bails
  });

  it("passes 1-based attempt to onError then shouldRetry, in that order", async () => {
    const order: string[] = [];
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    const onError = vi.fn(() => order.push("onError"));
    const shouldRetry = vi.fn(() => {
      order.push("shouldRetry");
      return true;
    });
    await expect(
      retry(fn, { attempts: 2, onError, shouldRetry }),
    ).rejects.toThrow();
    expect(onError).toHaveBeenNthCalledWith(1, expect.any(Error), 1);
    expect(shouldRetry).toHaveBeenNthCalledWith(1, expect.any(Error), 1);
    expect(order.slice(0, 2)).toEqual(["onError", "shouldRetry"]);
  });

  // ── Feature 2: jitter (seedable) ────────────────────────────────

  it("applies jitter deterministically when Random is seeded", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));

    Random.seed(42);
    await expect(
      retry(fn, { attempts: 3, delay: 100, jitter: "full" }),
    ).rejects.toThrow();
    const first = delays();

    sleepMock.mockClear();
    Random.seed(42);
    await expect(
      retry(fn, { attempts: 3, delay: 100, jitter: "full" }),
    ).rejects.toThrow();
    const second = delays();

    expect(first).toEqual(second); // reproducible under the same seed
    // full jitter ∈ [0, computedDelay]; linear ceilings are 100, 200
    expect(first[0]).toBeGreaterThanOrEqual(0);
    expect(first[0]).toBeLessThanOrEqual(100);
    expect(first[1]).toBeLessThanOrEqual(200);
  });

  it("equal jitter keeps a floor of half the computed delay", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    Random.seed(7);
    await expect(
      retry(fn, { attempts: 2, delay: 100, jitter: "equal" }),
    ).rejects.toThrow();
    // equal jitter ∈ [delay/2, delay]
    expect(delays()[0]).toBeGreaterThanOrEqual(50);
    expect(delays()[0]).toBeLessThanOrEqual(100);
  });

  // ── Feature 3: maxDelay cap ─────────────────────────────────────

  it("caps the delay at maxDelay (before jitter)", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    await expect(
      retry(fn, {
        attempts: 4,
        delay: 100,
        backoff: "exponential",
        maxDelay: 250,
      }),
    ).rejects.toThrow();
    // 100, 200, min(400, 250)=250
    expect(delays()).toEqual([100, 200, 250]);
  });

  // ── Feature 4: function-form backoff ────────────────────────────

  it("uses a custom backoff function", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    const backoff = vi.fn((attempt: number, base: number) => base + attempt * 10);
    await expect(
      retry(fn, { attempts: 3, delay: 50, backoff }),
    ).rejects.toThrow();
    expect(delays()).toEqual([50, 60]); // base+0*10, base+1*10
  });

  // ── Feature 5: AbortSignal ──────────────────────────────────────

  it("rejects immediately if the signal is already aborted", async () => {
    const fn = vi.fn();
    const controller = new AbortController();
    controller.abort();
    await expect(retry(fn, { signal: controller.signal })).rejects.toBeDefined();
    expect(fn).not.toHaveBeenCalled();
  });

  it("aborts promptly during a delay instead of waiting it out", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    const controller = new AbortController();
    const start = Date.now();

    const promise = retry(fn, {
      attempts: 5,
      delay: 10_000, // long enough that waiting it out would fail the assertion
      signal: controller.signal,
    });
    setTimeout(() => controller.abort(), 20);

    await expect(promise).rejects.toBeDefined();
    expect(Date.now() - start).toBeLessThan(1_000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("surfaces the abort reason when provided", async () => {
    const fn = vi.fn().mockRejectedValue(new Error("x"));
    const controller = new AbortController();
    const reason = new Error("cancelled by user");

    const promise = retry(fn, {
      attempts: 3,
      delay: 5_000,
      signal: controller.signal,
    });
    setTimeout(() => controller.abort(reason), 10);

    await expect(promise).rejects.toBe(reason);
  });

  // ── Feature 7: retryable() factory ──────────────────────────────

  it("retryable() pre-binds options and forwards arguments", async () => {
    let calls = 0;
    const base = vi.fn(async (x: number) => {
      calls++;
      if (calls < 2) throw new Error("nope");
      return x * 2;
    });
    const wrapped = retryable(base, { attempts: 3 });
    expect(await wrapped(21)).toBe(42);
    expect(base).toHaveBeenCalledTimes(2);
  });
});
