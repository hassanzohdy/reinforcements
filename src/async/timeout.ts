/**
 * Race `promise` against an `ms` timer. Rejects with a `TimeoutError`
 * (or the provided `message`) if the timer wins.
 *
 * @example
 * await timeout(fetch(url), 5000, "Request took too long");
 */
export default function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = `Operation timed out after ${ms}ms`,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const timerPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });

  return Promise.race([promise, timerPromise]).finally(() => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
  });
}
