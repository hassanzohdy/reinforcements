import sleep from "./sleep";

export type RetryBackoff = "linear" | "exponential";

export type RetryOptions = {
  /** Maximum total attempts (including the first try). Default: `3`. */
  attempts?: number;
  /** Base delay between attempts in ms. Default: `0`. */
  delay?: number;
  /** Delay growth strategy. Default: `"linear"`. */
  backoff?: RetryBackoff;
  /** Callback invoked on each failed attempt before the next try. */
  onError?: (error: unknown, attempt: number) => void;
};

/**
 * Run `fn` up to `attempts` times, waiting `delay` ms between attempts
 * (scaled by `backoff`). Throws the last error if all attempts fail.
 *
 * @example
 * await retry(() => fetch(url), {
 *   attempts: 5,
 *   delay: 100,
 *   backoff: "exponential",
 * });
 */
export default async function retry<T>(
  fn: () => Promise<T> | T,
  options: RetryOptions = {},
): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delay = options.delay ?? 0;
  const backoff = options.backoff ?? "linear";
  const onError = options.onError;

  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      onError?.(error, attempt + 1);

      const isLastAttempt = attempt === attempts - 1;

      if (isLastAttempt) {
        break;
      }

      if (delay > 0) {
        await sleep(computeDelay(delay, backoff, attempt));
      }
    }
  }

  throw lastError;
}

function computeDelay(
  base: number,
  backoff: RetryBackoff,
  attempt: number,
): number {
  if (backoff === "exponential") {
    return base * Math.pow(2, attempt);
  }

  return base * (attempt + 1);
}
