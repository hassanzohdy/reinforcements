/**
 * Run `fn` and return its result; if it throws (or rejects), return
 * `fallback` instead of propagating the error. Works for both sync and
 * async functions — when `fn` returns a promise, `attempt` returns a
 * promise too. Without a `fallback`, the result is `undefined` on error.
 *
 * @example
 * const config = attempt(() => JSON.parse(raw), {});
 * const user = await attempt(() => api.getUser(id), null);
 */
export default function attempt<T, F = undefined>(
  fn: () => Promise<T>,
  fallback?: F,
): Promise<T | F>;
export default function attempt<T, F = undefined>(
  fn: () => T,
  fallback?: F,
): T | F;
export default function attempt(fn: () => any, fallback?: any): any {
  try {
    const result = fn();

    if (result instanceof Promise) {
      return result.catch(() => fallback);
    }

    return result;
  } catch {
    return fallback;
  }
}
