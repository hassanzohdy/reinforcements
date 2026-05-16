export type MemoizeOptions<T extends (...args: any[]) => any> = {
  /** Build a custom cache key. Default: `JSON.stringify(args)`. */
  resolver?: (...args: Parameters<T>) => string;
  /** Time-to-live in ms; entries older than this are recomputed. Default: never. */
  ttl?: number;
};

export type Memoized<T extends (...args: any[]) => any> = T & {
  /** Clear all cached entries. */
  clear(): void;
  /** Drop a single cached entry by its computed key. */
  forget(key: string): void;
};

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const DEFAULT_RESOLVER = (...args: any[]): string => JSON.stringify(args);

/**
 * Memoize the return value of `fn` keyed by its arguments.
 *
 * @example
 * const slow = memoize((n: number) => heavyCompute(n));
 *
 * slow(10); // computes
 * slow(10); // cached
 */
export default function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions<T> = {},
): Memoized<T> {
  const resolver = options.resolver ?? DEFAULT_RESOLVER;
  const ttl = options.ttl;
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();

  const memoized = function (this: any, ...args: Parameters<T>) {
    const key = resolver(...args);
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && (ttl === undefined || cached.expiresAt > now)) {
      return cached.value;
    }

    const value = fn.apply(this, args);

    cache.set(key, {
      value,
      expiresAt: ttl === undefined ? Infinity : now + ttl,
    });

    return value;
  } as Memoized<T>;

  memoized.clear = () => cache.clear();
  memoized.forget = (key: string) => {
    cache.delete(key);
  };

  return memoized;
}
