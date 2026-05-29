import Random from "../Random/random";
import sleep from "./sleep";

/** Built-in delay growth strategies. */
export type RetryBackoff = "linear" | "exponential";

/**
 * Custom backoff function. Receives the 0-based `attempt` index and the
 * configured `baseDelay`, returns the raw delay in ms (before `maxDelay`
 * cap and `jitter`).
 */
export type RetryBackoffFn = (attempt: number, baseDelay: number) => number;

/**
 * Jitter strategy for spreading retry delays so many clients don't
 * re-collide in waves (thundering herd).
 *
 * - `false` — deterministic, no jitter (default; keep for test stability).
 * - `"full"` / `true` — `random(0, delay)`; maximum spread (AWS "full jitter").
 * - `"equal"` — `delay/2 + random(0, delay/2)`; keeps a floor.
 */
export type RetryJitter = boolean | "full" | "equal";

export type RetryOptions = {
  /** Maximum total attempts (including the first try). Default: `3`. */
  attempts?: number;
  /** Base delay between attempts in ms. Default: `0`. */
  delay?: number;
  /**
   * Delay growth strategy — a built-in name or a custom function.
   * Default: `"linear"`.
   */
  backoff?: RetryBackoff | RetryBackoffFn;
  /** Ceiling applied to the computed delay (after backoff, before jitter). */
  maxDelay?: number;
  /** Randomise each delay to avoid thundering herd. Default: `false`. */
  jitter?: RetryJitter;
  /** Observe each failed attempt (logging/metrics). `attempt` is 1-based. */
  onError?: (error: unknown, attempt: number) => void;
  /**
   * Decide whether to retry after a failure. Return `false` to stop
   * immediately and throw the current error (no further attempts, no
   * delay). Omitted → retry all errors. May be async. `attempt` is 1-based.
   */
  shouldRetry?: (
    error: unknown,
    attempt: number,
  ) => boolean | Promise<boolean>;
  /** Cancel the retry loop between or during attempts. */
  signal?: AbortSignal;
};

/**
 * Run `fn` up to `attempts` times, waiting `delay` ms between attempts
 * (scaled by `backoff`, capped by `maxDelay`, spread by `jitter`). Throws
 * the last error if all attempts fail.
 *
 * `shouldRetry` lets you bail out early on non-retryable errors (e.g. 4xx
 * / validation). `signal` cancels the loop — a pending delay is raced
 * against the signal so an abort resolves promptly instead of waiting the
 * delay out.
 *
 * @example
 * await retry(() => fetch(url), {
 *   attempts: 5,
 *   delay: 100,
 *   backoff: "exponential",
 *   maxDelay: 2_000,
 *   jitter: "full",
 *   shouldRetry: err => !(err instanceof ValidationError),
 *   signal: controller.signal,
 * });
 */
export default async function retry<T>(
  fn: () => Promise<T> | T,
  options: RetryOptions = {},
): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delay = options.delay ?? 0;
  const backoff = options.backoff ?? "linear";
  const { maxDelay, jitter = false, onError, shouldRetry, signal } = options;

  // Pre-abort: reject immediately if the signal is already aborted.
  if (signal?.aborted) {
    throw abortReason(signal);
  }

  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    // Bail before re-running `fn` if we were aborted during a delay.
    if (signal?.aborted) {
      throw abortReason(signal);
    }

    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Observe first, then decide.
      onError?.(error, attempt + 1);

      if (shouldRetry && !(await shouldRetry(error, attempt + 1))) {
        throw error;
      }

      const isLastAttempt = attempt === attempts - 1;
      if (isLastAttempt) {
        break;
      }

      const ms = computeDelay(delay, backoff, attempt, maxDelay, jitter);
      if (ms > 0) {
        await sleepWithSignal(ms, signal);
      }
    }
  }

  throw lastError;
}

/**
 * Pre-bind retry options to a function, returning a reusable wrapper so
 * you don't re-pass the same options at every call site.
 *
 * @example
 * const fetchUser = retryable(getUser, { attempts: 4, backoff: "exponential" });
 * await fetchUser(id);
 */
export function retryable<A extends any[], T>(
  fn: (...args: A) => Promise<T> | T,
  options?: RetryOptions,
): (...args: A) => Promise<T> {
  return (...args: A) => retry(() => fn(...args), options);
}

function computeDelay(
  base: number,
  backoff: RetryBackoff | RetryBackoffFn,
  attempt: number,
  maxDelay: number | undefined,
  jitter: RetryJitter,
): number {
  let raw: number;

  if (typeof backoff === "function") {
    raw = backoff(attempt, base);
  } else if (backoff === "exponential") {
    raw = base * Math.pow(2, attempt);
  } else {
    raw = base * (attempt + 1);
  }

  const capped = Math.min(raw, maxDelay ?? Infinity);

  return applyJitter(capped, jitter);
}

function applyJitter(value: number, jitter: RetryJitter): number {
  if (!jitter || value <= 0) {
    return value;
  }

  // Use the package's seedable Random so tests can pin the schedule.
  if (jitter === "equal") {
    return value / 2 + Random.float(0, value / 2);
  }

  // "full" or true
  return Random.float(0, value);
}

/**
 * Sleep for `ms`, but reject promptly if `signal` aborts mid-wait instead
 * of waiting the full delay out.
 */
function sleepWithSignal(ms: number, signal?: AbortSignal): Promise<void> {
  if (!signal) {
    return sleep(ms);
  }

  return new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(abortReason(signal));
    };

    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Resolve the error to throw when a signal aborts. Modern runtimes set
 * `signal.reason` (a DOMException `AbortError`) automatically; fall back
 * to a labelled `Error` when it's missing.
 */
function abortReason(signal: AbortSignal): unknown {
  if (signal.reason !== undefined) {
    return signal.reason;
  }

  const error = new Error("The retry operation was aborted.");
  error.name = "AbortError";

  return error;
}
