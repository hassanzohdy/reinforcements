/**
 * Typed wrapper around `Promise.allSettled`.
 *
 * @example
 * const results = await pAllSettled([a(), b()]);
 */
export default function pAllSettled<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: T[K] | Promise<T[K]> }],
): Promise<{ [K in keyof T]: PromiseSettledResult<T[K]> }> {
  return Promise.allSettled(promises) as Promise<{
    [K in keyof T]: PromiseSettledResult<T[K]>;
  }>;
}
