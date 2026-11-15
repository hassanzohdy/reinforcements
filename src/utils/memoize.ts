export type MemoizeOptions<T extends (...args: any[]) => any> = {
  /**
   * Build a custom cache key. Default: `JSON.stringify(args)`, with
   * `undefined` kept apart from `null`. Arguments the default cannot
   * serialize (cyclic structures, `BigInt`) skip the cache and call `fn`
   * directly. Errors thrown by a custom resolver propagate.
   */
  resolver?: (...args: Parameters<T>) => string;
  /** Time-to-live in ms; entries older than this are recomputed. Default: never. */
  ttl?: number;
  /**
   * Maximum number of cached entries. When full, the least recently
   * used entry is evicted. Use `Infinity` for an unbounded cache; `0`
   * (or less) disables caching. Default: `1000`.
   */
  maxSize?: number;
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

const DEFAULT_MAX_SIZE = 1000;

/**
 * `undefined` is written as `"\u0000u"`, and a string that already starts
 * with `"\u0000"` gets one more `"\u0000"` in front, so no real argument
 * can produce the same key as `undefined`. Other strings are untouched.
 */
const ESCAPE = "\u0000";
const UNDEFINED_MARKER = ESCAPE + "u";

/** Same as `JSON.stringify`, but `undefined` no longer collides with `null`. */
const DEFAULT_RESOLVER = (...args: any[]): string =>
  JSON.stringify(args, (_key, value) => {
    if (value === undefined) return UNDEFINED_MARKER;

    if (typeof value === "string" && value.startsWith(ESCAPE)) {
      return ESCAPE + value;
    }

    return value;
  });

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
  const customResolver = options.resolver;
  const resolver = customResolver ?? DEFAULT_RESOLVER;
  const ttl = options.ttl;
  const maxSize = options.maxSize ?? DEFAULT_MAX_SIZE;
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();
  // expired entries are swept at most once per `ttl`, so a miss stays O(1)
  // on average instead of scanning the whole cache every time
  let nextSweepAt = 0;

  const memoized = function (this: any, ...args: Parameters<T>) {
    let key: string;

    try {
      key = resolver(...args);
    } catch (error) {
      // the default resolver throws on cyclic or BigInt args: skip the cache
      if (customResolver) throw error;

      return fn.apply(this, args);
    }

    const cached = cache.get(key);
    const now = Date.now();

    if (cached) {
      if (ttl === undefined || cached.expiresAt > now) {
        // refresh recency: Map keeps insertion order, oldest first
        cache.delete(key);
        cache.set(key, cached);

        return cached.value;
      }

      cache.delete(key);
    }

    const value = fn.apply(this, args);

    if (ttl !== undefined && now >= nextSweepAt) {
      for (const [entryKey, entry] of cache) {
        if (entry.expiresAt <= now) cache.delete(entryKey);
      }

      nextSweepAt = now + ttl;
    }

    if (!(maxSize > 0)) {
      return value;
    }

    cache.delete(key);

    while (cache.size >= maxSize) {
      cache.delete(cache.keys().next().value as string);
    }

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
