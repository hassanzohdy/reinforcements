# Changelog

All notable changes to `@mongez/reinforcements` are documented in this file.

## 3.2.0

### Added

- **`retry` — `shouldRetry` predicate.** Bail out of the retry loop early on non-retryable errors (4xx / validation). Returning `false` stops immediately and throws the current error, with no further attempts or delay. Async-capable. Runs after `onError` (observe, then decide).
- **`retry` — jitter.** `jitter: "full" | "equal" | true` randomises each delay (`"full"` = `random(0, delay)`, `"equal"` = `delay/2 + random(0, delay/2)`) to avoid thundering herd. Draws from the seedable `Random`, so schedules stay reproducible under `Random.seed(n)`.
- **`retry` — `maxDelay`.** Caps the computed delay (after backoff, before jitter) so exponential backoff can't grow without bound.
- **`retry` — function-form `backoff`.** `backoff: (attempt, baseDelay) => number` for custom strategies (decorrelated jitter, Fibonacci, capped-exponential) beyond the built-in `"linear" | "exponential"`.
- **`retry` — `AbortSignal` support.** Pass `signal` to cancel between or during attempts; a pending delay is raced against the signal so cancellation resolves promptly.
- **`retryable(fn, options?)`** — new export. Pre-binds retry options to a function, returning a reusable wrapper.

All additions are optional with defaults preserving the previous behaviour — **no breaking change**.

### Tests

- `retry.test.ts` expanded to 14 tests covering each option, seeded-jitter determinism, abort timing, and async `shouldRetry`.

## 3.1.0

### Added

- **`compact(value, options?)`** — strip "empty" entries from an object or array. Default predicate drops `null`, `undefined`, and `""`; keeps `0`/`false`/`NaN`. Empty arrays/objects are dropped, and recursion is enabled by default — parents that become empty after recursion are themselves dropped. Customisable via `{ predicate, empties, deep }`. Typical use: cleaning API payloads, query strings, form data.
- **`pProps(object)`** — parallel object destructuring (modelled on Bluebird's `Promise.props`). Resolves an object of promises to an object of unwrapped values with the same keys, with full type inference. Non-promise values pass through. Joins the existing `pAll` / `pMap` / `pSeries` / `pFilter` async family.

### Tests

- 96 test files, 372 tests, all passing (+2 files / +18 tests over 3.0.0).

## 3.0.0

### Breaking

- **Tests migrated from Jest to Vitest.** Internal change for contributors; consumers are unaffected. `jest`/`ts-jest`/`@types/jest`/`jest-esm-jsx-transform` removed from devDependencies.
- **`only` → `pick`, `except` → `omit`** (community-standard names). `only` and `except` remain exported as `@deprecated` aliases and will be removed in a future major.
- **`flatten` signature** changed from positional args `(obj, separator?, keepNested?, parent?, root?)` to options-object `(obj, { separator?, keepNested?, maxDepth? })`. Internal recursion args (`parent`, `root`) are no longer part of the public API.
- **`merge`** is now sane around nullish inputs (`merge(null, { a: 1 })` returns `{ a: 1 }`, not `null`) and supports array merging strategy via final `{ arrays: "replace" | "concat" | "union" }` options.
- **`get`** no longer returns the raw literal key when an object happens to have a key matching the dot-notation path; it always walks the path. Falsy values resolve as themselves rather than triggering the default.
- **`set`** now creates arrays (rather than objects) when an intermediate segment is missing and the next segment is a numeric index.
- **`sort`** now operates only on plain objects (matches its actual scope; arrays of objects are out of scope — use a collections-package `sortBy`).
- **`areEqual`** is a real non-mutating deep-equal. Arrays now respect order (`[1,2,3]` ≠ `[3,2,1]`).
- **`shuffle`** uses Fisher–Yates and is non-mutating by default; pass `{ mutate: true }` for in-place.
- **`clone`** handles `RegExp`, `Error`, `Map`, `Set`, typed arrays, and circular references via WeakMap memo. Class instances are still preserved by reference (cloning custom constructors is out of scope).
- **`toCamelCase` / `toSnakeCase` / `toKebabCase` / `toStudlyCase`** rebuilt on a shared `words()` normalizer. **Fixes the acronym-eating bug**: `toSnakeCase("AIAgent")` is now `"ai_agent"` (previously `"agent"`). `XMLHttpRequest`, `parseURL`, `IOError`, etc. now produce the expected output.
- **`round`** actually rounds (was `Math.floor` previously).
- **`debounce`** now exposes `cancel()`, `flush()`, `pending()`, and supports `{ leading, trailing, maxWait }`. Removed dead module-level `timeoutId`.
- **`Random.color()`** pads to six hex digits (no more `#fff` collapse).
- **`Random.date()`** signature is now `{ min?, max? }` options.
- **`Random.integer` / `Random.boolean`** duplicate aliases removed (use `int` / `bool`).
- **`ARABIC_PATTERN`** renamed to **`ARABIC_REGEX`**; `ARABIC_PATTERN` kept as deprecated re-export.

### Added

**Types**
- `Path<T>`, `PathValue<T, P>` — typed dot-notation autocomplete.
- `DeepPartial`, `DeepRequired`, `DeepReadonly`, `DeepMutable`.
- `Prettify`, `UnionToIntersection`, `Branded`.
- `Nullable<T>`, `Maybe<T>`, `Awaitable<T>`, `NonEmptyArray<T>`.

**Object**
- `pick`, `omit` (new canonical names for `only`/`except`).
- `has(obj, path)` — counterpart to `get`/`set`.
- `mapValues`, `mapKeys`.
- `entries`, `fromEntries`, `keys`, `values` — typed wrappers.
- `invert(obj)` — swap keys and values.
- `defaults(target, ...sources)` — fill undefined keys.
- `walk(obj, visitor)` — recursive leaf traversal.
- `diff(a, b)` — `{ added, removed, changed }` structural diff.
- `freeze(obj)` — recursive `Object.freeze`.

**String**
- `words(str)` — shared semantic tokenizer powering all casings.
- `toPascalCase` (alias of `toStudlyCase` with the common name).
- `toTitleCase`, `toConstantCase`, `toDotCase`, `toPathCase`.
- `slugify(str, options)` — URL-safe, diacritic-stripping.
- `truncate(str, length, { suffix, byWord, position })`.
- `pad`, `padStart`, `padEnd` — typed helpers.
- `escapeHtml`, `unescapeHtml`.
- `mask(str, { start, end, char })` — middle-masking.
- `template(str, vars)` — `{path}` interpolation with dot-notation.
- `wordCount`, `charCount` (unicode-aware option).
- `reverse(str)` — unicode-safe.
- `containsArabic`.

**Number**
- `ceil`, `floor` with precision (companions to fixed `round`).
- `clamp(value, min, max)`.
- `inRange(value, min, max, options)`.
- `lerp(a, b, t)`.
- `toFixed(value, precision)` — returns number, not string.
- `formatBytes(bytes, { decimals, binary })`.
- `formatNumber(value, { locale, ...IntlOptions })`.
- `percentage(value, total, decimals)`.
- `safeDivide(a, b, fallback)`.
- `parseNumber(value, fallback)`.

**Function / Utils**
- `throttle(fn, wait, options)` — leading/trailing controls.
- `memoize(fn, { resolver, ttl })`.
- `once`, `after(n, fn)`, `before(n, fn)`.
- `pipe(value, ...fns)`, `compose(...fns)`.
- `tap(value, fn)` and `tap.with(fn)`.
- `curry`, `partial`, `partialRight`.
- `noop`, `identity`, `constant`, `negate`.

**Async** (new namespace)
- `sleep(ms, value?)`.
- `retry(fn, { attempts, delay, backoff, onError })`.
- `timeout(promise, ms, message?)`.
- `pAll`, `pAllSettled` — typed tuple-preserving wrappers.
- `pMap(items, mapper, { concurrency, stopOnError })`.
- `pSeries`, `pFilter`.
- `defer<T>()` — externally-resolvable promise.
- `debounceAsync(fn, wait)`.

**Random**
- `Random.pick`, `Random.sample`, `Random.weighted`.
- `Random.uuid()` (uses `crypto.randomUUID` when available).
- `Random.nanoid(size)`, `Random.token(bytes)` (crypto-backed where possible).
- `Random.float(min, max, precision?)`.
- `Random.seed(seed)` — mulberry32 reproducible mode.

**Lazy** (existing API kept, additions only)
- `lazy.async(producer)` — async lazy reference.
- `lazy.from(value)` — pre-resolved lazy.
- `type LazyAsync<T>`.

**Mixed**
- `coalesce(...values)` — first non-nullish.
