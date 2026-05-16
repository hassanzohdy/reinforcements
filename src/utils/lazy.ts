const LAZY = Symbol("lazy");

/**
 * A lazy reference produced by `lazy()`. Holds a producer function whose
 * return value is resolved on first `resolve()` call and memoised
 * thereafter.
 */
export type Lazy<T> = {
  readonly [LAZY]: true;
  /** Compute (if not yet resolved) and return the cached value. */
  resolve(): T;
  /** Drop the cached value; next `resolve()` recomputes lazily. */
  reset(): void;
  /** Whether `resolve()` has been called and a value cached. */
  isResolved(): boolean;
  /**
   * Return the cached value without forcing computation. Returns
   * `undefined` if not yet resolved — pair with `isResolved()` to
   * disambiguate from a resolved-to-undefined value.
   */
  peek(): T | undefined;
};

/**
 * An async lazy reference produced by `lazy.async()`. Resolves a promise
 * on first `resolve()` call and memoises the resulting promise.
 */
export type LazyAsync<T> = {
  readonly [LAZY]: true;
  /** Trigger (if not yet started) and return the cached promise. */
  resolve(): Promise<T>;
  /** Drop the cached promise; next `resolve()` re-invokes the producer. */
  reset(): void;
  /** Whether `resolve()` has been called (the promise may still be pending). */
  isResolved(): boolean;
  /** Return the cached promise without starting it. */
  peek(): Promise<T> | undefined;
};

/**
 * Wrap a value-producing function as a lazy reference. The producer
 * isn't invoked until `resolve()` is called; subsequent calls return the
 * same cached value.
 *
 * Useful for deferring expensive computations and for breaking circular
 * module dependencies — JavaScript closures capture variable bindings,
 * not values, so a `lazy(() => x)` callsite remains valid even when `x`
 * isn't yet defined at the moment the wrapper is created, as long as
 * it's defined by the time `.resolve()` runs.
 *
 * @example
 * const greeting = lazy(() => expensiveComputation());
 *
 * greeting.resolve(); // computes, caches, returns
 * greeting.resolve(); // returns cached value, no recomputation
 */
function lazy<T>(producer: () => T): Lazy<T> {
  let isResolved = false;
  let value: T;

  return {
    [LAZY]: true,
    resolve(): T {
      if (!isResolved) {
        value = producer();
        isResolved = true;
      }

      return value;
    },
    reset(): void {
      isResolved = false;
      value = undefined as T;
    },
    isResolved(): boolean {
      return isResolved;
    },
    peek(): T | undefined {
      return isResolved ? value : undefined;
    },
  };
}

/**
 * Async variant of {@link lazy}: the producer returns a `Promise<T>`
 * which is cached after first invocation.
 *
 * @example
 * const user = lazy.async(() => fetchUser());
 *
 * await user.resolve(); // fetches
 * await user.resolve(); // returns same promise, no refetch
 */
lazy.async = function lazyAsync<T>(producer: () => Promise<T>): LazyAsync<T> {
  let started = false;
  let promise: Promise<T>;

  return {
    [LAZY]: true,
    resolve(): Promise<T> {
      if (!started) {
        promise = producer();
        started = true;
      }

      return promise;
    },
    reset(): void {
      started = false;
      promise = undefined as unknown as Promise<T>;
    },
    isResolved(): boolean {
      return started;
    },
    peek(): Promise<T> | undefined {
      return started ? promise : undefined;
    },
  };
};

/**
 * Build a pre-resolved lazy reference. Useful for tests and for API
 * symmetry where a `Lazy<T>` is expected.
 *
 * @example
 * const ref = lazy.from(42);
 *
 * ref.resolve(); // 42
 * ref.isResolved(); // true
 */
lazy.from = function lazyFrom<T>(value: T): Lazy<T> {
  return {
    [LAZY]: true,
    resolve: () => value,
    reset() {
      // pre-resolved lazies cannot be reset
    },
    isResolved: () => true,
    peek: () => value,
  };
};

export default lazy;

/**
 * Type guard that returns `true` when `value` is a `Lazy<T>` or
 * `LazyAsync<T>` produced by `lazy()` / `lazy.async()`.
 *
 * @example
 * if (isLazy(value)) {
 *   value.resolve();
 * }
 */
export function isLazy<T = unknown>(value: unknown): value is Lazy<T> {
  return value?.[LAZY as keyof typeof value] === true;
}
