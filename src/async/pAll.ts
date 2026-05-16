/**
 * Typed wrapper around `Promise.all` that preserves tuple shape.
 *
 * @example
 * const [user, posts] = await pAll([fetchUser(), fetchPosts()]);
 */
export default function pAll<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: T[K] | Promise<T[K]> }],
): Promise<T> {
  return Promise.all(promises) as Promise<T>;
}
