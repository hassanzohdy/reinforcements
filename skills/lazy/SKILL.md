---
name: mongez-reinforcements-lazy
description: |
  Memoised deferred values via lazy() from @mongez/reinforcements — the primary tool for breaking ES-module circular imports and deferring expensive computation until first use.
---
# Lazy

Memoised deferred values. The flagship utility of the package — the unique tool for breaking ES-module circular imports.

```ts
import { lazy, isLazy, type Lazy, type LazyAsync } from "@mongez/reinforcements";
```

## `lazy(producer)`

```ts
lazy<T>(producer: () => T): Lazy<T>

type Lazy<T> = {
  resolve(): T;          // compute (once) and return the cached value
  reset(): void;         // drop the cache; next resolve() recomputes
  isResolved(): boolean; // has resolve() been called?
  peek(): T | undefined; // cached value without forcing computation
};
```

The producer **is not invoked** until the first `resolve()`. The result is then memoised.

```ts
const config = lazy(() => loadHeavyConfig());

config.resolve();   // computes
config.resolve();   // cached, no recomputation
config.reset();     // forget cached value
config.resolve();   // recomputes
config.peek();      // returns cached value or undefined
config.isResolved(); // true / false
```

## Why it exists: circular imports

JavaScript closures capture **variable bindings**, not values. When Module A imports Module B which imports Module A, the value that A wants from B might not be defined yet at module-init time. `lazy()` defers the reference resolution to call time.

```ts
// In a module that creates a circular dep:
const service = lazy(() => Service); // Service is undefined right now — fine

export function handler() {
  return service.resolve().run();    // Service is guaranteed to exist by this point
}
```

## `lazy.async(producer)`

```ts
lazy.async<T>(producer: () => Promise<T>): LazyAsync<T>

type LazyAsync<T> = {
  resolve(): Promise<T>;
  reset(): void;
  isResolved(): boolean;
  peek(): Promise<T> | undefined;
};
```

Same shape as `lazy`, but the cached value is a `Promise<T>`.

```ts
const user = lazy.async(() => fetch("/api/me").then(r => r.json()));

await user.resolve();  // fetches
await user.resolve();  // returns the same cached promise — no refetch
user.reset();
await user.resolve();  // refetches
```

## `lazy.from(value)`

```ts
lazy.from<T>(value: T): Lazy<T>
```

Pre-resolved lazy — for tests or for API symmetry where a `Lazy<T>` is expected but the value is already known.

```ts
const ref = lazy.from(42);
ref.resolve();      // 42
ref.isResolved();   // true
ref.reset();        // no-op for pre-resolved lazies
```

## `isLazy(value)`

```ts
isLazy<T = unknown>(value: unknown): value is Lazy<T>
```

Type guard. Returns `true` for both `lazy()` and `lazy.async()` results.

```ts
if (isLazy<number>(value)) {
  value.resolve(); // typed as number
}
```

## Idioms

**Resetting on config reload:**

```ts
const cachedConfig = lazy(() => parseConfigFile());

watchConfigFile(() => {
  cachedConfig.reset();
});

export function getSetting(key: string) {
  return cachedConfig.resolve()[key]; // re-parses on first call after reload
}
```

**Disambiguating "not yet resolved" from "resolved to undefined":**

```ts
const maybe = lazy(() => undefined);

maybe.isResolved();  // false
maybe.peek();        // undefined
maybe.resolve();
maybe.isResolved();  // true
maybe.peek();        // undefined  ← but isResolved() distinguishes the cases
```

**Error retry:** producers that throw are not memoised; the next `resolve()` re-invokes the producer.
