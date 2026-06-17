---
name: mongez-reinforcements-async
description: |
  Async/Promise utilities from @mongez/reinforcements — sleep, retry with backoff, timeout racing, pProps/pAll/pMap/pSeries/pFilter for concurrent work, defer, and debounceAsync.
---
# Async

Promise-based control flow: sleep, retry, timeout, bounded concurrent map/filter/series, defer, async debounce.

```ts
import {
  sleep, retry, retryable, timeout,
  pAll, pAllSettled, pMap, pSeries, pFilter, pReduce,
  poll, waitFor, defer, debounceAsync,
} from "@mongez/reinforcements";
```

## `sleep`

```ts
sleep(ms: number): Promise<void>
sleep<T>(ms: number, value: T): Promise<T>
```

```ts
await sleep(100);
const ready = await sleep(50, "ok"); // "ok"
```

## `retry`

```ts
retry<T>(fn: () => Promise<T> | T, options?: {
  attempts?: number;                                          // default 3
  delay?: number;                                             // base ms; default 0
  backoff?: "linear" | "exponential"                          // default "linear"
         | ((attempt: number, baseDelay: number) => number);  // or a custom fn
  maxDelay?: number;                                          // ceiling on the computed delay
  jitter?: boolean | "full" | "equal";                        // spread delays; default false
  onError?: (error: unknown, attempt: number) => void;        // observe (1-based attempt)
  shouldRetry?: (error: unknown, attempt: number)             // decide; false = stop now
             => boolean | Promise<boolean>;
  signal?: AbortSignal;                                       // cancel between/during attempts
}): Promise<T>
```

Throws the **last** error if all attempts fail. All options are optional and default to today's behaviour — nothing here is a breaking change.

```ts
const data = await retry(() => fetchUser(id), {
  attempts: 5,
  delay: 200,
  backoff: "exponential",  // 200, 400, 800, 1600 ms between attempts
  onError: (err, attempt) => log(`attempt ${attempt} failed`, err),
});
```

**Bail out on non-retryable errors** with `shouldRetry` — observe with `onError`, decide with `shouldRetry` (called in that order):

```ts
await retry(() => placeOrder(input), {
  attempts: 3,
  delay: 500,
  shouldRetry: err => !(err instanceof ValidationError), // don't retry 4xx
});
```

**Avoid thundering herd + cap the wait** with `jitter` and `maxDelay`:

```ts
await retry(() => fetch(url), {
  attempts: 6,
  delay: 100,
  backoff: "exponential",
  maxDelay: 2_000,   // never wait more than 2s, even as backoff grows
  jitter: "full",    // randomise each delay across [0, computed]
});
```

`jitter: "full"` (or `true`) → `random(0, delay)`; `"equal"` → `delay/2 + random(0, delay/2)`. Jitter draws from the package's seedable `Random`, so `Random.seed(n)` makes the schedule reproducible in tests.

**Cancel a long retry loop** with an `AbortSignal` — a pending delay is raced against the signal, so an abort resolves promptly instead of waiting the delay out:

```ts
const controller = new AbortController();
const promise = retry(poll, { attempts: 10, delay: 1_000, signal: controller.signal });
controller.abort(); // rejects with signal.reason
```

## `retryable`

Pre-bind retry options to a function, returning a reusable wrapper so you don't re-pass options at every call site:

```ts
retryable<A, T>(fn: (...args: A) => Promise<T> | T, options?: RetryOptions): (...args: A) => Promise<T>
```

```ts
const fetchUser = retryable(getUser, { attempts: 4, backoff: "exponential" });
await fetchUser(id);
```

> **Tip:** `exponential` backoff with many `attempts` and no `maxDelay` can produce very long waits — set `maxDelay` to bound the worst case.

## `timeout`

```ts
timeout<T>(promise: Promise<T>, ms: number, message?: string): Promise<T>
```

Races `promise` against a timer; rejects with `new Error(message)` if the timer wins.

```ts
const result = await timeout(fetch(url), 5_000, "Request too slow");
```

Combines well with `retry`:

```ts
await retry(
  () => timeout(fetch(url), 3_000),
  { attempts: 3, delay: 500, backoff: "exponential" },
);
```

## `pProps` — parallel object destructuring

```ts
pProps<T extends Record<string, unknown>>(
  object: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
```

Run an object's worth of promises in parallel and resolve to an object with the same keys but unwrapped values. Modelled on Bluebird's `Promise.props`. Non-promise values pass through unchanged.

```ts
const { user, settings, home } = await pProps({
  user:     getUserFromDB(),
  settings: loadSettingsAsync(),
  home:     getHome(),
});

// Mixed promises and plain values are fine:
await pProps({ a: 1, b: Promise.resolve(2) }); // { a: 1, b: 2 }
```

Rejects on the first rejected promise (same semantics as `Promise.all`).

## `pAll` / `pAllSettled`

```ts
pAll<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: T[K] | Promise<T[K]> }],
): Promise<T>

pAllSettled<T extends readonly unknown[]>(
  promises: readonly [...{ [K in keyof T]: T[K] | Promise<T[K]> }],
): Promise<{ [K in keyof T]: PromiseSettledResult<T[K]> }>
```

Typed tuple-preserving wrappers around `Promise.all` / `Promise.allSettled`.

```ts
const [user, posts] = await pAll([fetchUser(), fetchPosts()]);
// user: User, posts: Post[]
```

## Bounded concurrency

#### `pMap`

```ts
pMap<T, U>(
  items: readonly T[],
  mapper: (item: T, index: number) => Promise<U> | U,
  options?: {
    concurrency?: number;   // default Infinity
    stopOnError?: boolean;  // default true
  },
): Promise<U[]>
```

Preserves input order in the output. With `stopOnError: false`, every error is collected and the first one is thrown after all items complete.

```ts
const docs = await pMap(urls, fetch, { concurrency: 5 });
```

#### `pSeries`

```ts
pSeries<T, U>(items: readonly T[], mapper: (item, index) => Promise<U> | U): Promise<U[]>
```

Strictly sequential. Stops at the first thrown error.

```ts
await pSeries(migrations, m => runMigration(m));
```

#### `pFilter`

```ts
pFilter<T>(
  items: readonly T[],
  predicate: (item: T, index: number) => Promise<boolean> | boolean,
  options?: { concurrency?: number },
): Promise<T[]>
```

```ts
const reachable = await pFilter(urls, u => ping(u), { concurrency: 4 });
```

## `defer`

```ts
defer<T = void>(): {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}
```

Externally resolvable promise — useful for bridging callback APIs.

```ts
function whenReady() {
  const d = defer<void>();
  emitter.once("ready", () => d.resolve());
  emitter.once("error", err => d.reject(err));
  return d.promise;
}
```

## `debounceAsync`

```ts
debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>
```

Async-aware debounce: every call returns a promise; bursts collapse into a single `fn` invocation; **all the burst's promises resolve with the same final result**.

```ts
const search = debounceAsync(
  (q: string) => fetch(`/search?q=${q}`).then(r => r.json()),
  250,
);

const a = search("a");
const b = search("ab");
const c = search("abc");
// 250ms later: one fetch("abc"); a, b, c all resolve with that result
```

## `poll`

```ts
poll<T>(fn: (attempt: number) => Promise<T> | T, options?: {
  interval?: number;                                // ms between attempts; default 1000
  timeout?: number;                                 // give up after ms; default none
  attempts?: number;                                // max attempts; default none
  until?: (result: T, attempt: number) => boolean;  // stop condition; default: result is truthy
  signal?: AbortSignal;                             // abort early
}): Promise<T>
```

Repeatedly call `fn` until `until(result)` is truthy, then resolve with that result. Rejects on `timeout`, the `attempts` cap, or abort. Ideal for polling job status or readiness.

```ts
const job = await poll(() => api.getJob(id), {
  interval: 2_000,
  timeout: 60_000,
  until: job => job.status === "done",
});
```

## `waitFor`

```ts
waitFor(
  condition: (attempt: number) => Promise<boolean> | boolean,
  options?: WaitForOptions, // = Omit<PollOptions, "until">
): Promise<void>
```

Convenience wrapper around `poll` for boolean readiness checks — resolves once `condition` is truthy.

```ts
await waitFor(() => queue.isEmpty(), { interval: 100, timeout: 5_000 });
```

## `pReduce`

```ts
pReduce<T, A>(
  items: readonly T[],
  reducer: (acc: A, item: T, index: number) => Promise<A> | A,
  initial: A,
): Promise<A>
```

Sequential async reduce — awaits the accumulator between steps. The async sibling of `Array.prototype.reduce`.

```ts
const total = await pReduce(ids, async (sum, id) => sum + (await fetchScore(id)), 0);
```
