<div align="center">

# @mongez/reinforcements

**A typed, dependency-free TypeScript utility belt — ~130 functions for objects, strings, numbers, async, randomness, and functional composition.**

[![npm](https://img.shields.io/npm/v/@mongez/reinforcements.svg)](https://www.npmjs.com/package/@mongez/reinforcements)
[![license](https://img.shields.io/npm/l/@mongez/reinforcements.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@mongez/reinforcements.svg)](https://bundlephobia.com/package/@mongez/reinforcements)
[![downloads](https://img.shields.io/npm/dw/@mongez/reinforcements.svg)](https://www.npmjs.com/package/@mongez/reinforcements)

</div>

---

## Why @mongez/reinforcements?

`lodash` is the obvious comparison — but it carries a 70+ KB cost at the door and its tree-shaking story is famously brittle: deep imports work, the barrel does not, and modern bundlers still pull in transitive helpers you never asked for. `ramda` is excellent, but it sells a different paradigm (curried, point-free, often slower) that costs every team a re-training tax. Single-purpose packages (`debounce`, `slugify`, `nanoid`, `p-map`, `clone-deep`) each solve one problem and force you to assemble your own consistency layer — they argue about option names, error semantics, and TypeScript strictness. Native JS gets you 80% of the way until you hit acronym-aware `toSnakeCase("XMLHttpRequest")`, deep merge with array-union strategy, dot-notation path types, or a debounce with `cancel` / `flush` / `maxWait` — at which point you re-invent the same 200 lines on every project.

`@mongez/reinforcements` is one package, one set of conventions, zero runtime dependencies, and strict TypeScript end-to-end. Import what you need, drop the rest at build time.

```ts
import { get, slugify, debounce, retry, pMap, Random } from "@mongez/reinforcements";

const email = get(user, "profile.email");                   // typed by path
const slug  = slugify("Café & Croissant");                   // "cafe-croissant"
const save  = debounce(persist, 500, { maxWait: 3_000 });    // cancel/flush/pending
const data  = await retry(() => fetch(url), { attempts: 5 });
const docs  = await pMap(urls, fetch, { concurrency: 5 });
const id    = Random.uuid();
```

> **Looking for arrays?** Richer collection ops live in **[`@mongez/collection`](https://github.com/hassanzohdy/collection)**.
> **Looking for type/shape predicates** (`isString`, `isEmpty`, …)? Those live in **[`@mongez/supportive-is`](https://github.com/hassanzohdy/supportive-is)**.

---

## Features

| Namespace | Count | Examples |
|---|---|---|
| **Objects** | 25 | `get`, `set`, `has`, `pick`, `omit`, `compact`, `when`, `merge`, `clone`, `flatten`, `walk`, `diff`, `mapValues`, `mapKeys` |
| **Strings** | 38 | `words`, `slugify`, `truncate`, `template`, `mask`, `toCamelCase`, `toSnakeCase`, `toKebabCase`, `escapeHtml`, `stripHtmlTags` |
| **Numbers** | 14 | `round`, `floor`, `ceil`, `clamp`, `inRange`, `lerp`, `percentage`, `safeDivide`, `formatBytes`, `formatNumber`, `formatDuration`, `ordinal` |
| **Mixed** | 4 | `clone`, `areEqual`, `shuffle`, `coalesce` |
| **Arrays** | 24 | `chunk`, `range`, `unique`, `pluck`, `groupBy`, `countBy`, `partition`, `keyBy`, `intersection`, `difference`, `union`, `zip`, `unzip`, `sum`, `average`, `median`, `min`, `max` |
| **Function utilities** | 19 | `debounce`, `throttle`, `memoize`, `once`, `pipe`, `compose`, `tap`, `curry`, `partial`, `attempt`, `lazy`, `isLazy` |
| **Async** | 14 | `sleep`, `retry`, `timeout`, `pAll`, `pAllSettled`, `pMap`, `pProps`, `pSeries`, `pFilter`, `pReduce`, `poll`, `waitFor`, `defer`, `debounceAsync` |
| **Random** | 13 | `Random.int`, `Random.float`, `Random.uuid`, `Random.nanoid`, `Random.pick`, `Random.sample`, `Random.weighted`, `Random.seed` |
| **Types** | 13 | `Path<T>`, `PathValue`, `DeepPartial`, `DeepRequired`, `DeepReadonly`, `DeepMutable`, `Branded`, `Prettify` |

All ~130 utilities ship from the package root with strict TypeScript generics, zero runtime dependencies, and full Vitest coverage. Each module is a separate file — modern bundlers prune unused exports at build time.

---

## Installation

```sh
npm install @mongez/reinforcements
```

```sh
yarn add @mongez/reinforcements
```

```sh
pnpm add @mongez/reinforcements
```

No peer dependencies. Node 18+ recommended for `crypto.randomUUID` / `crypto.getRandomValues` in `Random`; older runtimes fall back to the internal PRNG.

---

## Quick start

```ts
import {
  get, set, has, pick, omit, compact, merge, clone,
  slugify, truncate, toCamelCase, toSnakeCase,
  clamp, formatBytes,
  debounce, memoize, pipe,
  pMap, pProps, retry, sleep, defer,
  Random, lazy, template,
} from "@mongez/reinforcements";

// Typed dot-notation paths
const user = { id: 1, profile: { email: "ada@example.com" } };
get(user, "profile.email");                 // "ada@example.com" (typed)
has(user, "profile.email");                 // true
set(user, "profile.country", "EG");

// Casing — acronym-aware
toSnakeCase("XMLHttpRequest");              // "xml_http_request"
toCamelCase("api-base-url");                // "apiBaseUrl"

// Slug & truncate
slugify("Hello, Café & Croissant!");        // "hello-cafe-croissant"
truncate("hello world there", 14, { byWord: true }); // "hello world..."

// Numbers
formatBytes(1_500_000);                     // "1.50 MB"
clamp(150, 0, 100);                         // 100

// Parallel object destructuring
const { profile, settings } = await pProps({
  profile:  fetchProfile(1),
  settings: loadSettings(1),
});

// Bounded concurrent map
const docs = await pMap(urls, fetch, { concurrency: 5 });

// Clean payloads before sending — drops "", null, undefined, [], {}
compact({ name: "Ada", email: "", phone: null, age: 0 });
// { name: "Ada", age: 0 }

// Resilient async
const data = await retry(() => fetchUser(id), {
  attempts: 5,
  delay: 200,
  backoff: "exponential",
});

// Templated strings with dot-notation vars
template("Hi {user.name}, you have {count} items.", {
  user: { name: "Ada" }, count: 3,
});
// "Hi Ada, you have 3 items."

// Reproducible randomness for tests
Random.seed(42);
Random.uuid();

// Lazy / deferred references
const config = lazy(() => loadConfig());
config.resolve();                           // computes once, cached thereafter
```

That's the entire surface in 50 lines. Everything below is depth on the same imports.

---

## Objects

`get` / `set` / `has` accept typed dot-notation. The path autocompletes from your object's type, and the return type resolves to the exact value type at that path.

```ts
import { get, set, has, unset, pick, omit, merge, compact, clone } from "@mongez/reinforcements";

type User = {
  id: number;
  profile: { email: string; addresses: { city: string }[] };
};

const user: User = {
  id: 1,
  profile: { email: "ada@example.com", addresses: [{ city: "Cairo" }] },
};

get(user, "profile.email");                 // string (typed)
get(user, "profile.addresses.0.city");      // string (typed)
get(user, "profile.email", "n/a");          // string fallback when missing
has(user, "profile.email");                 // true — distinguishes "key absent" from "value undefined"
set(user, "profile.country", "EG");         // mutates and returns user
unset(user, ["profile.email"]);             // delete by path
```

### Read / write / inspect

| Function | Description |
| --- | --- |
| `get(obj, path, default?)` | Typed dot-notation read; falsy values pass through correctly. |
| `set(obj, path, value)` | Typed dot-notation write; auto-creates arrays when next segment is numeric. |
| `has(obj, path)` | `true` if the path exists, even when the value is `undefined`. |
| `unset(obj, paths)` | Mutating remove by dot-notation. |
| `keys(obj)` / `values(obj)` / `entries(obj)` / `fromEntries(it)` | Typed wrappers. |
| `walk(obj, visitor)` | Recursive leaf traversal — `(value, path, parent, key) => void`. |
| `diff(a, b)` | `{ added, removed, changed }` structural diff (deep-compares branches). |

### Subset / transform

| Function | Description |
| --- | --- |
| `pick(obj, keys \| predicate)` | New object with only requested keys/paths or predicate-matching entries. |
| `omit(obj, keys \| predicate)` | New object excluding requested keys/paths or predicate-matching entries. |
| `only` / `except` | Deprecated v2 aliases of `pick` / `omit` — still work. |
| `compact(value, options?)` | Strip nullish / empty-string / empty-container entries. Recursive by default. Keeps `0`/`false`/`NaN`. |
| `when(condition, value)` | Return `value` (or `value()`) when `condition` is truthy, else `{}`. For inline conditional spreading; factory value runs lazily. |
| `defaults(target, ...sources)` | Fill `undefined` keys on `target` from `sources`, left-to-right. |
| `invert(obj)` | Swap keys and values (values coerced to strings). |
| `mapValues(obj, fn)` / `mapKeys(obj, fn)` | Transform values or keys, return new object. |
| `map(obj, fn)` | Map an object to an array via `(key, value, obj) => U`. |
| `freeze(obj)` | Recursive `Object.freeze`. |
| `sort(obj, recursive?)` | Return new object with keys alphabetically sorted. |

### Deep merge / clone / flatten

```ts
import { merge, clone, flatten } from "@mongez/reinforcements";

const defaults  = { theme: "light", features: { beta: false }, tags: ["core"] };
const overrides = { features: { beta: true }, tags: ["pro"] };

merge(defaults, overrides);                            // { theme: "light", features: { beta: true }, tags: ["pro"] }
merge(defaults, overrides, { arrays: "concat" });      // tags: ["core", "pro"]
merge(defaults, overrides, { arrays: "union" });       // tags: ["core", "pro"]   (deduped)

clone({ a: { b: 1 } });                                // deep clone
clone(new Map([["k", 1]]));                            // deep-clones values
clone(new Date(0));                                    // new Date instance

flatten({ a: { b: 1 } });                              // { "a.b": 1 }
flatten({ a: { b: 1 } }, { separator: "/" });          // { "a/b": 1 }
```

`merge` is variadic and detects its options argument by shape (a trailing object whose single own key is `arrays`). `clone` handles `Date`, `RegExp`, `Error`, `Map`, `Set`, typed arrays, and circular references.

> **Non-plain class instances are cloned by reference, not deep-copied.** Your class owns its own copy semantics — `clone` won't synthesize a half-broken instance from a `User` or `Decimal` you defined yourself. Implement `clone()` on the class if you need a deep copy.

---

## Strings

The casing family is built on a shared `words()` tokenizer that preserves acronym runs. This fixes the long-standing v2 bug where leading acronyms were silently eaten:

```ts
import { toSnakeCase, toCamelCase, toKebabCase, toConstantCase, toTitleCase, words } from "@mongez/reinforcements";

words("XMLHttpRequest");           // ["XML", "Http", "Request"]
words("AIAgent");                  // ["AI", "Agent"]
words("api-base-url");             // ["api", "base", "url"]

toSnakeCase("AIAgent");            // "ai_agent"        (v2 returned "agent")
toSnakeCase("XMLHttpRequest");     // "xml_http_request"
toSnakeCase("parseURL");           // "parse_url"
toCamelCase("XMLHttpRequest");     // "xmlHttpRequest"
toCamelCase("api-base-url");       // "apiBaseUrl"
toKebabCase("getUserID");          // "get-user-id"
toConstantCase("apiBaseUrl");      // "API_BASE_URL"
toTitleCase("the lord of the rings"); // "The Lord of the Rings"
```

### Casing variants

| Function | Result for `"helloWorld"` |
| --- | --- |
| `toCamelCase` | `"helloWorld"` |
| `toStudlyCase` / `toPascalCase` | `"HelloWorld"` |
| `toSnakeCase` | `"hello_world"` |
| `toKebabCase` | `"hello-world"` |
| `toConstantCase` | `"HELLO_WORLD"` |
| `toDotCase` | `"hello.world"` |
| `toPathCase` | `"hello/world"` |
| `toTitleCase` | `"Hello World"` |
| `ucfirst` | `"HelloWorld"` |
| `capitalize` | `"HelloWorld"` (first char of every word) |

### Slugify, truncate, template, mask

```ts
import { slugify, truncate, template, mask } from "@mongez/reinforcements";

slugify("Café & Croissant");                                    // "cafe-croissant"
slugify("Hello, World!", { separator: "_" });                   // "hello_world"
slugify("Hello, World!", { separator: "_", lower: false });     // "Hello_World"

truncate("Hello world", 5);                                     // "He..."
truncate("Hello world", 8, { byWord: true });                   // "Hello..."
truncate("abcdefghij", 7, { position: "middle" });              // "ab...ij"

template("Hi {user.name}, you have {count} new {kind}.", {
  user: { name: "Ada" }, count: 3, kind: "messages",
});
// "Hi Ada, you have 3 new messages."

mask("4242424242424242", { start: 0, end: 4 });                 // "************4242"
mask("hassan@example.com", { start: 2, end: 4 });               // "ha************.com"
mask("+201234567890", { start: 4, end: 2, char: "•" });         // "+201•••••••90"
```

### Replacement, padding, trimming

| Function | Description |
| --- | --- |
| `replaceAll(s, search, replacement)` | Replace every occurrence (literal `search`, not regex). |
| `replaceFirst(s, search, replacement)` / `replaceLast(...)` | Single-edge replacement. |
| `removeFirst(s, needle)` / `removeLast(s, needle)` | Drop the first / last occurrence. |
| `repeatsOf(s, needle, caseSensitive?)` | Count occurrences. |
| `trim(s, needle?)` / `ltrim` / `rtrim` | Trim arbitrary characters from both/either side. |
| `pad(s, length, char?)` / `padStart(...)` / `padEnd(...)` | Padding helpers. |

### HTML, file, Arabic, miscellaneous

| Function | Description |
| --- | --- |
| `escapeHtml(s)` / `unescapeHtml(s)` | Escape / unescape `& < > " '`. |
| `stripHtmlTags(s, options?)` | Remove tags; `<script>` and `<style>` blocks are dropped with their content by default. |
| `wordCount(s)` | Count whitespace-separated words. |
| `charCount(s, { unicode? })` | UTF-16 code units (default) or graphemes (emoji-aware). |
| `reverse(s)` | Unicode-safe reverse. |
| `initials(name, separator?)` | First letter of each whitespace-separated word. |
| `extension(filename)` | The substring after the last dot, or `""`. |
| `toInputName(path)` | `"a.b.c"` → `"a[b][c]"` (HTML form names). |
| `containsArabic(s)` / `startsWithArabic(s, trimmed?)` | Arabic-aware detection. |
| `ARABIC_REGEX` / `ARABIC_PATTERN` | Exported pattern (the latter is a deprecated alias). |

> **`stripHtmlTags` is a regex transform, not a sanitizer.** For untrusted HTML where an attacker can inject markup, use a parser-based sanitizer like DOMPurify.

---

## Async helpers

```ts
import {
  sleep, retry, timeout, pAll, pAllSettled, pMap, pProps, pSeries, pFilter, pReduce,
  poll, waitFor, defer, debounceAsync,
} from "@mongez/reinforcements";
```

### Single-promise helpers

| Function | Description |
| --- | --- |
| `sleep(ms, value?)` | Delay; resolves to `value` (or `undefined`). |
| `retry(fn, options?)` | `{ attempts, delay, backoff: "linear" \| "exponential", onError }`. |
| `timeout(promise, ms, message?)` | Race against a timer; rejects with the message when the timer wins. |
| `poll(fn, { interval?, timeout?, attempts?, until?, signal? })` | Repeat `fn` until `until(result)` is truthy; resolves with that result. |
| `waitFor(condition, options?)` | Resolve once `condition` is truthy; `poll` wrapper for readiness checks. |
| `defer<T>()` | Externally-resolvable promise: `{ promise, resolve, reject }`. |

```ts
const ready = defer<string>();
setTimeout(() => ready.resolve("done"), 100);
await ready.promise;                        // "done"

const data = await retry(() => fetch(url).then(r => r.json()), {
  attempts: 5,
  delay: 200,
  backoff: "exponential",
  onError: (err, attempt) => log.warn(`attempt ${attempt} failed`, err),
});

await timeout(slowFetch(), 3_000, "Request took too long");

// Poll a background job until it finishes (or 60s elapses)
const job = await poll(() => api.getJob(id), {
  interval: 2_000,
  timeout: 60_000,
  until: j => j.status === "done",
});

await waitFor(() => queue.isEmpty(), { interval: 100, timeout: 5_000 });
```

### Collection helpers

| Function | Description |
| --- | --- |
| `pAll([p1, p2, ...])` | Tuple-preserving `Promise.all`. |
| `pAllSettled([p1, p2, ...])` | Tuple-preserving `Promise.allSettled`. |
| `pMap(items, mapper, { concurrency, stopOnError? })` | Bounded concurrent map (preserves input order). |
| `pProps({ ... })` | Parallel object destructuring; awaits every value, returns the unwrapped object. |
| `pSeries(items, mapper)` | Sequential map. |
| `pFilter(items, predicate, { concurrency? })` | Async filter. |
| `pReduce(items, reducer, initial)` | Sequential async reduce; awaits the accumulator between steps. |
| `debounceAsync(fn, wait)` | Async-aware debounce; bursts resolve to the final call's result. |

```ts
// Bounded concurrency — no more than 5 in flight at once
const docs = await pMap(userIds, fetchUser, { concurrency: 5 });

// Parallel object destructuring — every value resolved in parallel
const { user, settings, home } = await pProps({
  user:     fetchUser(1),
  settings: loadSettings(1),
  home:     loadHome(),
});

// Plain values are passed through unchanged
await pProps({ a: 1, b: Promise.resolve(2) });  // { a: 1, b: 2 }
```

> **`pProps` returns the same key shape, with each value awaited.** Use this whenever you have independent async work that you'd otherwise destructure from a hand-built `Promise.all`. The keys keep their TypeScript names.

---

## Function utilities

`debounce` / `throttle` / `memoize` ship with the controls you actually need at runtime — not just timer wrappers.

### Debounce and throttle

```ts
import { debounce, throttle } from "@mongez/reinforcements";

const save = debounce(payload => api.save(payload), 500, {
  leading: false,
  trailing: true,
  maxWait: 3_000,       // force a save at least every 3s
});

input.addEventListener("input", e => save(e.target.value));
button.addEventListener("click", () => save.flush());             // user pressed "Save"
window.addEventListener("beforeunload", () => save.cancel());     // user navigated away
if (save.pending()) showSpinner();

const onScroll = throttle(() => layout(), 100, { leading: true, trailing: true });
window.addEventListener("scroll", onScroll);
onScroll.cancel();
onScroll.flush();
```

| Method on `debounce` / `throttle` | Behaviour |
| --- | --- |
| `.cancel()` | Drop the pending call and reset timers. |
| `.flush()` | Run the pending call immediately. |
| `.pending()` | `true` if a call is currently queued. |

### Memoize

```ts
import { memoize } from "@mongez/reinforcements";

const lookupUser = memoize(
  (id: string) => db.users.findById(id),
  { ttl: 60_000 },                          // cache each result for 1 minute
);

await lookupUser("u1");                     // hits DB
await lookupUser("u1");                     // cache
// …61 seconds later…
await lookupUser("u1");                     // hits DB again

lookupUser.forget(JSON.stringify(["u1"]));  // surgical invalidation (default key = JSON.stringify(args))
lookupUser.clear();                         // wipe everything

// Custom cache key
const lookupByName = memoize(
  (firstName: string, lastName: string) => db.users.findByName(firstName, lastName),
  { resolver: (f, l) => `${f}|${l}` },
);
```

> **The default cache key is `JSON.stringify(args)`.** If your arguments contain `undefined`, `Function`, `Symbol`, or circular refs, supply a custom `resolver` — `JSON.stringify` will either lose data or throw on those inputs.

### Other function helpers

| Function | Description |
| --- | --- |
| `once(fn)` | Invoke once, cache the result for every subsequent call. |
| `after(n, fn)` / `before(n, fn)` | Gate invocation by call count. |
| `curry(fn)` | Auto-currying — calls become partial applications until arity is met. |
| `partial(fn, ...args)` / `partialRight(fn, ...args)` | Pre-bind args on the left / right. |
| `pipe(value, ...fns)` | Pipe a value through a sequence of unary functions, left-to-right. |
| `compose(...fns)` | Function composition (right-to-left); typed up to arity 5. |
| `tap(value, fn)` / `tap.with(fn)` | Side-effect probe that returns the value unchanged. |
| `noop` / `identity` / `constant(v)` / `negate(predicate)` | Tiny helpers. |
| `escapeRegex(s)` | Escape regex metacharacters. |
| `attempt(fn, fallback?)` | Run `fn`; on throw/reject return `fallback` (or `undefined`). Sync + async. |

```ts
import { attempt, pipe, tap, toSnakeCase, trim } from "@mongez/reinforcements";

const config = attempt(() => JSON.parse(rawConfig), {});  // never throws on bad JSON
const user = await attempt(() => api.getUser(id), null);  // null if the request fails


const result = pipe(
  rawInput,
  trim,
  tap.with(s => log.debug("after trim:", s)),     // side-effect, passes value through
  toSnakeCase,
  s => s + "_v3",
);
```

---

## Random

`Random` is a namespace class with a private constructor — every member is a static method. Defaults to `Math.random`; switch to a seeded mulberry32 PRNG with `Random.seed(n)` for reproducible output.

```ts
import { Random } from "@mongez/reinforcements";
```

| Method | Description |
| --- | --- |
| `Random.seed(n?)` | Seed the RNG; pass `undefined` to restore `Math.random`. |
| `Random.int(min?, max?)` | Inclusive integer range (defaults `1` … `9_999_999`). |
| `Random.float(min, max, precision?)` | Float in `[min, max)`, optionally rounded. |
| `Random.bool()` | Coin flip. |
| `Random.string(length?)` | Alphanumeric string (default 32 chars). |
| `Random.id(length?, prefix?)` | Prefixed alphanumeric id (default `"el-"`). |
| `Random.uuid()` | RFC 4122 v4 (uses `crypto.randomUUID` when available). |
| `Random.nanoid(size?)` | URL-safe 21-char id by default. |
| `Random.token(bytes?)` | Crypto-backed lowercase hex (default 16 bytes → 32 chars). |
| `Random.color()` | Six-digit `#rrggbb` hex color. |
| `Random.date({ min?, max? })` | Random `Date` in range. |
| `Random.pick(array)` | One element, or `undefined`. |
| `Random.sample(array, n)` | `n` unique elements via Fisher–Yates partial shuffle. |
| `Random.weighted([{ value, weight }, ...])` | Weighted pick; negative weights clamp to `0`. |

```ts
Random.uuid();                              // "0a8b40e1-d3ef-4d2e-87f4-1a8b40e1d3ef"
Random.nanoid(10);                          // "rH3kQ_pX7a"
Random.token(16);                           // 32-char crypto-backed hex
Random.color();                             // "#1f3a8a" (always 6 hex digits)

Random.weighted([
  { value: "free",    weight: 80 },
  { value: "premium", weight: 19 },
  { value: "vip",     weight:  1 },
]);                                         // "free" ~80% of the time

Random.sample([1, 2, 3, 4, 5], 3);          // 3 unique elements

Random.seed(42);
const a = Random.int(1, 1000);
Random.seed(42);
const b = Random.int(1, 1000);
a === b;                                    // true
```

> **Random is for ids and sampling, not cryptography.** `Random.uuid` / `nanoid` / `token` use `crypto` when available so they're safe as identifiers. Don't use any of them for password derivation, key generation, or signing — reach for the Web Crypto API directly for that.

---

## Lazy

`lazy(producer)` captures a *binding*, not a value. The producer runs only on first `resolve()`; the result is cached. The canonical fix for ES-module circular imports and the cleanest way to defer expensive setup.

```ts
import { lazy, isLazy } from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `lazy(producer)` | Sync lazy: `.resolve()`, `.reset()`, `.peek()`, `.isResolved()`. |
| `lazy.async(producer)` | Async variant — caches the `Promise<T>`. |
| `lazy.from(value)` | Pre-resolved lazy reference (for tests / API symmetry). |
| `isLazy(value)` | Type guard. |

```ts
const config = lazy(() => loadHeavyConfig());

config.resolve();                           // computes, caches
config.resolve();                           // returns cache
config.isResolved();                        // true
config.peek();                              // cached value (or undefined if not resolved)
config.reset();                             // drop cache; next resolve recomputes

// Async variant
const user = lazy.async(() => fetch("/api/me").then(r => r.json()));
await user.resolve();                       // fetches
await user.resolve();                       // same cached promise — no refetch

// Pre-resolved (handy in tests)
const stub = lazy.from({ id: 1 });
stub.resolve();                             // { id: 1 }
stub.isResolved();                          // true
```

> **`lazy.from(...)` cannot be reset.** It's a static reference dressed up as a lazy. If you need a recomputable lazy in tests, use `lazy(() => value)` instead.

---

## Arrays

A focused set of array helpers — dedupe, chunk, group, set operations, basic stats. Reach for **[`@mongez/collection`](https://github.com/hassanzohdy/collection)** when you need the chainable collection API and heavier operations (`sortBy`, `where`, `flatMap`, etc.).

```ts
import {
  chunk, range, unique, pluck, groupBy, countBy,
  partition, keyBy, intersection, difference, union, zip, unzip,
  sum, average, min, max, median,
  pushUnique, unshiftUnique,
  even, odd, evenIndexes, oddIndexes,
} from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `chunk(array \| string, size)` | Split into fixed-size chunks. |
| `range(min, max)` | Inclusive integer range; throws if `min >= max`. |
| `unique(array, key?)` | Deduplicate; optional dot-notation key for object arrays. |
| `pluck(array, key?)` | Map by dot-notation key (string) or build subsets (string array). |
| `groupBy(array, key \| keys[], listAs?)` | Group by one or more dot-notation keys. |
| `countBy(array, key)` | Count occurrences per `get(item, key)` value. |
| `partition(array, predicate)` | Split into `[pass, fail]` by predicate, single pass. |
| `keyBy(array, key \| selector)` | Index into an object keyed by a dot-path or selector; last wins. |
| `intersection(...arrays)` | Unique values present in **every** array. |
| `difference(array, ...others)` | Unique values in the first array but none of the others. |
| `union(...arrays)` | Unique values across all arrays, first-seen order. |
| `zip(...arrays)` / `unzip(rows)` | Pair arrays into tuples by index / the inverse. |
| `sum(array, key?)` / `average(array, key?)` / `median(array)` | Stats, optional dot-notation key. |
| `min(array)` / `max(array)` / `count(value)` | Basic helpers. |
| `pushUnique(array, ...items)` / `unshiftUnique(array, ...items)` | Mutating dedup-append / dedup-prepend. |
| `even(array)` / `odd(array)` | Filter by element parity. |
| `evenIndexes(array)` / `oddIndexes(array)` | Filter by index parity. |
| `average` / `avg` | Aliases — `avg` is the short form. |

```ts
chunk([1, 2, 3, 4, 5], 2);                  // [[1, 2], [3, 4], [5]]
range(1, 5);                                // [1, 2, 3, 4, 5]
unique([1, 1, 2, 3, 3]);                    // [1, 2, 3]
unique([{ id: 1 }, { id: 1 }, { id: 2 }], "id"); // [{ id: 1 }, { id: 2 }]

pluck([{ id: 1, name: "a" }, { id: 2, name: "b" }], "name"); // ["a", "b"]

groupBy(
  [{ status: "active", id: 1 }, { status: "active", id: 2 }, { status: "done", id: 3 }],
  "status",
);
// [
//   { status: "active", data: [{ status: "active", id: 1 }, { status: "active", id: 2 }] },
//   { status: "done",   data: [{ status: "done", id: 3 }] },
// ]

countBy([{ status: "active" }, { status: "active" }, { status: "done" }], "status");
// { active: 2, done: 1 }

partition([1, 2, 3, 4], n => n % 2 === 0);  // [[2, 4], [1, 3]]
keyBy([{ id: 1 }, { id: 2 }], "id");        // { "1": { id: 1 }, "2": { id: 2 } }
intersection([1, 2, 3], [2, 3, 4]);         // [2, 3]
difference([1, 2, 3, 4], [2, 4]);           // [1, 3]
union([1, 2], [2, 3]);                      // [1, 2, 3]
zip([1, 2], ["a", "b"]);                    // [[1, "a"], [2, "b"]]

sum([{ price: 10 }, { price: 20 }, { price: 30 }], "price"); // 60
average([10, 20, 30]);                      // 20
median([1, 2, 3, 4]);                       // 2.5
```

---

## Numbers

```ts
import {
  round, floor, ceil, toFixed,
  clamp, inRange, lerp,
  percentage, safeDivide, parseNumber,
  formatBytes, formatNumber, formatDuration, ordinal,
} from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `round(value, precision?)` | Real rounding with precision (`round(1.235, 2)` → `1.24`). |
| `floor(value, precision?)` / `ceil(value, precision?)` | Precision-aware floor / ceil. |
| `toFixed(value, precision)` | Like `Number.toFixed` but returns a `number`. |
| `clamp(value, min, max)` | Constrain to range. Swaps `min`/`max` if reversed. |
| `inRange(value, min, max, options?)` | Range test; `{ inclusive: true }` by default. |
| `lerp(a, b, t)` | Linear interpolation. |
| `percentage(value, total, decimals?)` | `value/total*100`; returns `0` when `total` is `0` instead of `NaN`/`Infinity`. |
| `safeDivide(a, b, fallback?)` | Division that returns `fallback` (default `0`) on divide-by-zero / non-finite. |
| `parseNumber(value, fallback?)` | Permissive numeric parse. |
| `formatBytes(bytes, { decimals?, binary? })` | `1500` → `"1.50 KB"`, `{ binary: true }` → `"1.46 KiB"`. |
| `formatNumber(value, IntlOptions)` | `Intl.NumberFormat` wrapper. |
| `formatDuration(ms, { units?, long?, separator? })` | Human-readable duration: `3661000` → `"1h 1m 1s"`. |
| `ordinal(value, { withNumber? })` | English ordinal: `1` → `"1st"`, `22` → `"22nd"`. |

```ts
clamp(150, 0, 100);                         // 100
percentage(7, 9, 1);                        // 77.8
safeDivide(10, 0);                          // 0
safeDivide(10, 0, null);                    // null
formatBytes(1_500_000);                     // "1.50 MB"
formatBytes(1500, { binary: true });        // "1.46 KiB"
formatDuration(3661000);                    // "1h 1m 1s"
formatDuration(90000, { long: true });      // "1 minute 30 seconds"
ordinal(22);                                // "22nd"
```

---

## Mixed

Helpers that don't belong to a single namespace.

```ts
import { clone, areEqual, shuffle, coalesce } from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `clone(value)` | Deep clone — re-exported from `object/clone`. |
| `areEqual(a, b)` | Deep value equality (handles Date, RegExp, Map, Set, circular). Non-mutating. |
| `shuffle(value, { mutate? })` | Fisher–Yates shuffle for arrays or strings. Non-mutating by default. |
| `coalesce(...values)` | First non-nullish; `0` / `""` / `false` pass through unlike `\|\|`. |

```ts
areEqual({ a: 1 }, { a: 1 });               // true
areEqual([1, 2], [1, 2]);                   // true
areEqual([1, 2], [2, 1]);                   // false — order matters

shuffle([1, 2, 3, 4]);                      // new array
shuffle([1, 2, 3, 4], { mutate: true });    // mutates in place

coalesce(undefined, null, 0, "fallback");   // 0      (not "fallback")
coalesce(undefined, "", "fallback");        // ""     (not "fallback")
coalesce(null, undefined);                  // undefined
```

> **`shuffle` is non-mutating by default in v3.** v2 mutated in place silently — pass `{ mutate: true }` if you depend on the old behaviour.

---

## Types

Typed dot-notation, plus deep-mapped utility types that ship with the package.

```ts
import type {
  Path, PathValue,
  DeepPartial, DeepRequired, DeepReadonly, DeepMutable,
  Prettify, UnionToIntersection, Branded,
  Nullable, Maybe, Awaitable, NonEmptyArray,
  GenericObject, AlphaNumeric, Primitive,
} from "@mongez/reinforcements";
```

```ts
type User = {
  id: number;
  profile: { email: string; addresses: { city: string }[] };
};

type UserPath  = Path<User>;
// "id" | "profile" | "profile.email" | "profile.addresses" | `profile.addresses.${number}` | …

type EmailType = PathValue<User, "profile.email">;   // string
type CityType  = PathValue<User, "profile.addresses.0.city">; // string

type UserId = Branded<string, "UserId">;             // string, but distinct from plain string

type PartialUser = DeepPartial<User>;                // every nested property optional
type FrozenUser  = DeepReadonly<User>;               // every nested property readonly
```

`Path<T>` recurses to depth 6 by default to keep the type-checker fast. For deeper trees, the second type parameter lets you tune the limit.

---

## Recipes

### Resilient HTTP with `retry` + `timeout` + `pMap`

Reach for this when you're fanning out network calls and need each one to be bounded, retried, and cap the in-flight count.

```ts
import { retry, timeout, pMap } from "@mongez/reinforcements";

async function fetchUser(id: string) {
  return retry(
    () => timeout(fetch(`/users/${id}`).then(r => r.json()), 3_000),
    {
      attempts: 5,
      delay: 200,
      backoff: "exponential",
      onError: (err, attempt) => console.warn(`attempt ${attempt} failed:`, err),
    },
  );
}

// Fetch 100 users, no more than 5 in flight, output preserves input order
const users = await pMap(userIds, fetchUser, { concurrency: 5 });
```

`timeout` rejects when the timer wins, `retry` swallows that rejection up to `attempts` times, and `pMap` keeps the network from going wild on the way out.

### Debounce auto-save with cancellation

Reach for this when typing into a form should persist, but only after the user pauses — and you also need to flush before unload and cancel on route change.

```ts
import { debounce } from "@mongez/reinforcements";

const save = debounce(
  (payload: FormPayload) => api.save(payload),
  500,
  { maxWait: 3_000 },           // force a save at least every 3 seconds
);

form.addEventListener("input", () => save(serializeForm(form)));

// Manual save: cancel the pending timer, run immediately
saveButton.addEventListener("click", () => save.flush());

// User navigated away mid-burst: don't leave a stale save dangling
beforeRouteChange(() => {
  if (save.pending()) save.flush();
  save.cancel();
});

// Show a "saving…" indicator while a save is queued or in-flight
const updateIndicator = () => indicator.classList.toggle("pending", save.pending());
form.addEventListener("input", updateIndicator);
```

`{ maxWait: 3_000 }` is the difference between a debounce that protects the server and one that loses data when the user keeps typing for a minute.

### Break circular imports with `lazy`

Two modules need to reference each other. ES modules resolve imports at parse time, so one of them sees `undefined` at the moment of import — but only at that moment. By the time the *function* runs, the other module is fully evaluated.

```ts
// services/user.ts
import { lazy } from "@mongez/reinforcements";
import { OrderService } from "./order";     // imports user.ts back

const orders = lazy(() => OrderService);    // captures the binding, not the value

export class UserService {
  static getOrders(userId: string) {
    return orders.resolve().findByUserId(userId);
  }
}

// services/order.ts
import { UserService } from "./user";

export class OrderService {
  static findByUserId(userId: string) {
    const user = UserService.getUser(userId);
    // ...
  }
}
```

Before `lazy`, the canonical fix was a dynamic `import()` and a top-level `await` — neither of which plays well with bundlers. `lazy(() => Service)` is a one-line, sync, statically-importable alternative.

### Memoize with TTL for expensive lookups

Reach for this when a function is pure for a window of time — DB lookups, geo IP, currency rates, parsed configs — but you don't want a stale value forever.

```ts
import { memoize } from "@mongez/reinforcements";

const lookupUser = memoize(
  async (id: string) => db.users.findById(id),
  { ttl: 60_000 },                          // 1 minute
);

await lookupUser("u1");                     // hits DB
await lookupUser("u1");                     // cache (< 1 min)
// …61 seconds later…
await lookupUser("u1");                     // hits DB again

// Surgical invalidation on write
async function updateUser(id: string, patch: UserPatch) {
  await db.users.update(id, patch);
  lookupUser.forget(JSON.stringify([id]));
}

// Or nuke everything (e.g. on logout)
function onLogout() {
  lookupUser.clear();
}
```

### Reproducible randomness for tests

Reach for this whenever a test calls into code that uses `Math.random` (sampling, shuffling, id generation) and you need the test to be deterministic.

```ts
import { Random } from "@mongez/reinforcements";

beforeEach(() => Random.seed(42));          // every test starts from the same PRNG state
afterEach(() => Random.seed(undefined));    // restore Math.random for other tests

test("sample is deterministic when seeded", () => {
  expect(Random.sample([1, 2, 3, 4, 5], 3)).toEqual([3, 1, 5]);  // same every run
});
```

> **`Random.uuid` uses `crypto.randomUUID` when available.** The seed only affects the internal PRNG fallback. Tests that need deterministic uuids should mock `crypto.randomUUID` directly, or run in an environment where it isn't present.

### Mask PII for logs and display

Reach for this when audit logs, debug output, or admin UIs need to show that a value exists without exposing it.

```ts
import { mask, pick } from "@mongez/reinforcements";

function safeUserSnapshot(user: User) {
  return {
    ...pick(user, ["id", "createdAt", "role"]),
    email:        mask(user.email,        { start: 2,  end: 10 }),
    phone:        mask(user.phone,        { start: 4,  end: 2, char: "•" }),
    creditCard:   mask(user.creditCard,   { start: 0,  end: 4 }),
    ssn:          mask(user.ssn,          { start: 0,  end: 4 }),
  };
}

log.info("user snapshot", safeUserSnapshot(user));
// email: "ha*********gmail.com"
// phone: "+201•••••••90"
// creditCard: "************4242"
```

`pick` keeps the snapshot to non-sensitive fields; `mask` reduces the sensitive ones to something you can paste into a chat or a ticket.

### Parallel object destructuring with `pProps`

Reach for this when a request handler needs three independent pieces of data and you'd otherwise hand-build a `Promise.all([...])` + array destructure.

```ts
import { pProps } from "@mongez/reinforcements";

async function loadDashboard(userId: string) {
  const { user, recentOrders, recommendations, settings } = await pProps({
    user:            fetchUser(userId),
    recentOrders:    fetchOrders(userId, { limit: 10 }),
    recommendations: fetchRecommendations(userId),
    settings:        loadSettings(userId),
  });

  return renderDashboard({ user, recentOrders, recommendations, settings });
}
```

Versus the hand-built version, you keep meaningful names, you don't have to remember array order, and TypeScript infers the result shape directly from the input keys.

### Deep merge with array union for config layering

Reach for this when you have a defaults layer, an environment layer, and a per-request override layer — and arrays in those layers represent permission sets, feature flags, or tags that you want unioned, not replaced.

```ts
import { merge } from "@mongez/reinforcements";

const defaults = {
  theme: "light",
  features: { beta: false, telemetry: true },
  permissions: ["read"],
};

const envOverrides = {
  features: { telemetry: false },
  permissions: ["write"],
};

const userOverrides = {
  features: { beta: true },
  permissions: ["read", "delete"],
};

merge(defaults, envOverrides, userOverrides, { arrays: "union" });
// {
//   theme: "light",
//   features: { beta: true, telemetry: false },
//   permissions: ["read", "write", "delete"]   // deduped union of all three
// }
```

Swap `"union"` for `"concat"` if duplicates carry meaning (e.g. event logs); leave it at the default `"replace"` if a later layer must overwrite earlier ones.

### Object change detection with `walk` + `diff`

Reach for this when you're shipping audit logs, settings panels, or sync engines that need to record "what changed" rather than "what is".

```ts
import { walk, diff } from "@mongez/reinforcements";

// Snapshot every leaf for telemetry
walk(config, (value, path) => telemetry.report(`config.${path}`, value));

// What changed between two snapshots?
const changes = diff(prevConfig, nextConfig);
// { added: { ... }, removed: { ... }, changed: { theme: { from: "light", to: "dark" } } }

for (const key of Object.keys(changes.changed)) {
  audit.log(`${key}: ${changes.changed[key].from} → ${changes.changed[key].to}`);
}

for (const key of Object.keys(changes.added)) {
  audit.log(`+ ${key}: ${changes.added[key]}`);
}

for (const key of Object.keys(changes.removed)) {
  audit.log(`- ${key}`);
}
```

> **`diff` reports at the top-level key, not at the leaf.** Two snapshots that differ only at `theme.dark.accent` show up as `changed.theme`. For leaf-level diffs, `walk` both snapshots into flat maps and diff those.

### Clean API payloads before sending

Reach for this when a form builds an outbound payload and unset fields should be omitted, not transmitted as `null` or `""`.

```ts
import { compact } from "@mongez/reinforcements";

const formData = {
  name:    "Ada",
  email:   "",                  // blank input
  phone:   null,                // not provided
  age:     0,                   // legitimate zero
  hobbies: [],                  // user removed every tag
  meta:    { source: "", campaign: null },
};

compact(formData);
// { name: "Ada", age: 0 }
// - email dropped (empty string)
// - phone dropped (null)
// - hobbies dropped (empty array, recursive)
// - meta dropped (became {} after inner compaction, then dropped)
// - age kept (0 is a legitimate value)

await api.post("/profile", compact(formData));
```

Default predicate keeps `0` / `false` / `NaN` because those carry meaning; pass a custom `predicate` if your domain needs different rules.

---

## Migrating from v2

The v3 release fixes long-standing bugs (acronym-eating casing, order-insensitive `areEqual`, silently-mutating `shuffle`, broken `round`, broken `Random.color`) and renames `only` / `except` to `pick` / `omit`. The deprecated names still work and emit `@deprecated` JSDoc warnings.

The full guide — including signature changes for `flatten`, `merge`, `shuffle`, and `Random.date` — is in [`MIGRATION.md`](./MIGRATION.md).

---

## Related packages

| Package | Use when you need |
|---|---|
| [`@mongez/supportive-is`](https://github.com/hassanzohdy/supportive-is) | Type/shape predicates — `isString`, `isEmpty`, `isPlainObject`, and friends. Sister package; load alongside `@mongez/reinforcements` when you need both manipulators and predicates. |
| [`@mongez/collection`](https://github.com/hassanzohdy/collection) | Richer array/collection operations — sort-by, partition, key-by, chained query builder. The arrays module here covers the basics; reach for `collection` for anything heavier. |

---

## Further reading

- [`llms-full.txt`](./llms-full.txt) — exhaustive single-file API surface for LLM-assisted development. Load once, no follow-up fetches needed.
- [`llms.txt`](./llms.txt) — short LLM-friendly index with per-namespace links.
- [`MIGRATION.md`](./MIGRATION.md) — v2 → v3 upgrade guide with every breaking change.
- [`CHANGELOG.md`](./CHANGELOG.md) — full release notes.
- [`skills/`](./skills) — per-topic deep-dives (objects, strings, numbers, async, recipes, …).

---

## License

MIT © [Hassan Zohdy](https://github.com/hassanzohdy)
