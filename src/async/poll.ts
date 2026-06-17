import sleep from "./sleep";

export type PollOptions<T> = {
  /** Delay between attempts in ms. Default: `1000`. */
  interval?: number;
  /** Give up after this many ms (measured before each attempt). Default: no timeout. */
  timeout?: number;
  /** Maximum number of attempts before giving up. Default: no cap. */
  attempts?: number;
  /**
   * Stop when this returns truthy for the latest result. Default: stop
   * when the result itself is truthy.
   */
  until?: (result: T, attempt: number) => boolean;
  /** Abort the loop early (checked before each attempt). */
  signal?: AbortSignal;
};

/**
 * Repeatedly call `fn` until `until(result)` is truthy (default: until
 * the result itself is truthy), then resolve with that result. Waits
 * `interval` ms between attempts and optionally gives up after `timeout`
 * ms or `attempts` tries.
 *
 * @example
 * // Wait for a background job to finish.
 * const job = await poll(() => api.getJob(id), {
 *   interval: 2000,
 *   timeout: 60000,
 *   until: job => job.status === "done",
 * });
 */
export default async function poll<T>(
  fn: (attempt: number) => Promise<T> | T,
  options: PollOptions<T> = {},
): Promise<T> {
  const interval = options.interval ?? 1000;
  const until = options.until ?? ((result: T) => Boolean(result));
  const maxAttempts = options.attempts ?? Infinity;
  const deadline =
    options.timeout !== undefined ? Date.now() + options.timeout : undefined;

  let attempt = 0;

  while (true) {
    if (options.signal?.aborted) {
      throw new Error("Polling aborted");
    }

    if (deadline !== undefined && Date.now() >= deadline) {
      throw new Error(`Polling timed out after ${options.timeout}ms`);
    }

    attempt++;

    const result = await fn(attempt);

    if (until(result, attempt)) {
      return result;
    }

    if (attempt >= maxAttempts) {
      throw new Error(`Polling stopped after ${attempt} attempts`);
    }

    await sleep(interval);
  }
}
