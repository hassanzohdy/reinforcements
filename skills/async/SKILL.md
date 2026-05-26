---
name: mongez-reinforcements-async
description: |
  Async/Promise utilities from @mongez/reinforcements — sleep, retry with backoff, timeout racing, pProps/pAll/pMap/pSeries/pFilter for concurrent work, defer, and debounceAsync.
  TRIGGER when: code imports `sleep`, `retry`, `timeout`, `pProps`, `pAll`, `pAllSettled`, `pMap`, `pSeries`, `pFilter`, `defer`, or `debounceAsync` from `@mongez/reinforcements`; user asks "how do I retry with backoff / race a promise against a timeout / limit concurrency / debounce an async call"; `import { sleep, retry, timeout, pMap, defer } from "@mongez/reinforcements"`.
  SKIP: @mongez/reinforcements-functions handles sync `debounce`/`throttle`/`memoize` — use this skill only for promise-returning helpers; raw `Promise.all`/`Promise.race` usage without `@mongez/reinforcements` imports; HTTP client features (fetch wrappers, interceptors) belong to a request library, not this package.
---
# Async

Promise-based control flow: sleep, retry, timeout, bounded concurrent map/filter/series, defer, async debounce.

```ts
import {
  sleep, retry, timeout,
  pAll, pAllSettled, pMap, pSeries, pFilter,
  defer, debounceAsync,
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
  attempts?: number;                       // default 3
  delay?: number;                          // ms; default 0
  backoff?: "linear" | "exponential";      // default "linear"
  onError?: (error: unknown, attempt: number) => void;
}): Promise<T>
```

Throws the **last** error if all attempts fail.

```ts
const data = await retry(() => fetchUser(id), {
  attempts: 5,
  delay: 200,
  backoff: "exponential",  // 200, 400, 800, 1600 ms between attempts
  onError: (err, attempt) => log(`attempt ${attempt} failed`, err),
});
```

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
