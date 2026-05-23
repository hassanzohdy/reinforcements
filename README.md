# Reinforcements

A typed, dependency-free toolbox of utilities for objects, strings, numbers, async work, and randomness — written in TypeScript, tested with Vitest, and tree-shakeable.

> Looking for arrays? Those live in **`@mongez/collections`**.
> Looking for type/shape predicates (`isString`, `isEmpty`, …)? Those live in **`@mongez/supportive-is`**.

- 📦 ~130 utilities across 7 namespaces
- 🔒 Strict TypeScript — typed dot-notation, deep generics, no `any` in public signatures
- ⚡️ Zero runtime dependencies
- 🧪 342 tests, 93 test files
- 🪶 Import individual files for maximum tree-shaking

For v1 documentation, see [`docs/VERSION-1.md`](./docs/VERSION-1.md). For a v2 → v3 upgrade guide, see [`MIGRATION.md`](./MIGRATION.md).

---

## Install

```sh
yarn add @mongez/reinforcements
# or
npm i @mongez/reinforcements
```

## A quick taste

```ts
import {
  clone, get, set, has, pick, omit, compact, merge, slugify, truncate,
  toCamelCase, toSnakeCase, formatBytes, clamp, debounce, retry,
  pMap, pProps, Random, lazy, template,
} from "@mongez/reinforcements";

// Typed dot-notation paths
const user = { id: 1, profile: { email: "ada@example.com" } };
get(user, "profile.email"); // "ada@example.com" (typed!)
has(user, "profile.email"); // true
set(user, "profile.country", "EG");

// Casing — acronym-aware
toSnakeCase("AIAgent");        // "ai_agent"
toCamelCase("XMLHttpRequest"); // "xmlHttpRequest"

// Slug & truncate
slugify("Hello, café & croissant!"); // "hello-cafe-croissant"
truncate("hello world there", 14, { byWord: true }); // "hello world..."

// Numbers
formatBytes(1_500_000);  // "1.50 MB"
clamp(150, 0, 100);      // 100

// Async with bounded concurrency
const docs = await pMap(urls, fetch, { concurrency: 5 });

// Parallel object destructuring
const { user, settings, home } = await pProps({
  user: getUser(),
  settings: loadSettings(),
  home: getHome(),
});

// Clean payloads before sending — drops "", null, undefined, [], {}
compact({ name: "Ada", email: "", phone: null, age: 0 });
// { name: "Ada", age: 0 }

// Resilient fetch
const data = await retry(() => fetchUser(id), {
  attempts: 5,
  delay: 200,
  backoff: "exponential",
});

// Templated strings with dot-notation vars
template("Hi {user.name}, you have {count} items.", {
  user: { name: "Ada" }, count: 3,
}); // "Hi Ada, you have 3 items."

// Reproducible randomness for tests
Random.seed(42);
Random.uuid();

// Lazy / deferred references
const config = lazy(() => loadConfig());
config.resolve(); // computes once, cached thereafter
```

---

## Recipes

Real-world snippets that show what each utility is actually good for.

### Typed dot-notation paths

`get`/`set`/`has` autocomplete every legal path on the input type and resolve the exact value type:

```ts
import { get, set, has } from "@mongez/reinforcements";

type User = { id: number; profile: { email: string; addresses: { city: string }[] } };

const user: User = {
  id: 1,
  profile: { email: "ada@example.com", addresses: [{ city: "Cairo" }] },
};

const email = get(user, "profile.email");          // typed as string
const city  = get(user, "profile.addresses.0.city"); // typed as string
const missing = get(user, "profile.email", "n/a"); // typed string, falls back

has(user, "profile.email"); // true — distinguishes "key absent" from "value undefined"
set(user, "profile.country", "EG");
```

### Casing — acronym-aware

The v3 casing family is rebuilt on a shared `words()` tokenizer that preserves acronym runs. This fixes a long-standing bug in v2 where leading acronyms were silently eaten:

```ts
import { toSnakeCase, toCamelCase, toKebabCase, toConstantCase } from "@mongez/reinforcements";

toSnakeCase("AIAgent");        // "ai_agent"      (v2 returned "agent" — bug)
toSnakeCase("XMLHttpRequest"); // "xml_http_request"
toSnakeCase("parseURL");       // "parse_url"
toSnakeCase("IOError");        // "io_error"
toCamelCase("XMLHttpRequest"); // "xmlHttpRequest"
toKebabCase("getUserID");      // "get-user-id"
toConstantCase("apiBaseUrl");  // "API_BASE_URL"
```

### Lazy references — break circular deps & defer expensive work

`lazy(producer)` captures a *binding*, not a value. The producer runs only on first `resolve()` and the result is cached. This is the canonical fix for ES-module circular imports where you need a reference that isn't defined yet at wrap time:

```ts
import { lazy, isLazy } from "@mongez/reinforcements";

// Module A imports Module B which imports Module A — `Service` isn't
// defined at the moment the lazy() runs, but that's fine.
const service = lazy(() => Service);

export function handler() {
  return service.resolve().run(); // Service is guaranteed to exist by now
}

// Deferred expensive computation — never paid for if .resolve() isn't called
const features = lazy(() => parseHugeYamlFile());
if (request.needsFeatures) features.resolve();

// Reset to recompute (e.g. after config reload)
features.reset();

// Async variant
const user = lazy.async(() => fetch("/api/me").then(r => r.json()));
await user.resolve(); // fetches once
await user.resolve(); // returns same cached promise
```

### Resilient async — `retry` + `timeout` + `pMap` composed

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

// Fetch 100 users, but no more than 5 in flight at a time, preserving order
const users = await pMap(userIds, fetchUser, { concurrency: 5 });
```

### Smarter debounce — cancel, flush, maxWait

```ts
import { debounce } from "@mongez/reinforcements";

const save = debounce(payload => api.save(payload), 500, {
  maxWait: 3_000,  // force a save at least every 3s
});

input.addEventListener("input", e => save(e.target.value));

// User clicked "Save Now"
button.addEventListener("click", () => save.flush());

// User navigated away
window.addEventListener("beforeunload", () => save.cancel());

// Loading indicator
if (save.pending()) showSpinner();
```

### Memoize with TTL

```ts
import { memoize } from "@mongez/reinforcements";

const lookupUser = memoize(
  (id: string) => db.users.findById(id),
  { ttl: 60_000 }, // cache each result for 1 minute
);

await lookupUser("u1"); // hits DB
await lookupUser("u1"); // cache
// …61 seconds later…
await lookupUser("u1"); // hits DB again

lookupUser.forget("u1"); // surgical invalidation
lookupUser.clear();      // nuke everything
```

### Deep merge with array strategies

```ts
import { merge } from "@mongez/reinforcements";

const defaults = { theme: "light", features: { beta: false }, tags: ["core"] };
const overrides = { features: { beta: true }, tags: ["pro"] };

merge(defaults, overrides);
// → { theme: "light", features: { beta: true }, tags: ["pro"] }  (replace)

merge(defaults, overrides, { arrays: "concat" });
// → tags: ["core", "pro"]

merge(defaults, overrides, { arrays: "union" });
// → tags: ["core", "pro"]   (deduped)
```

### Reproducible randomness for tests

```ts
import { Random } from "@mongez/reinforcements";

beforeEach(() => Random.seed(42));   // every test starts with the same RNG state
afterEach(() => Random.seed(undefined)); // restore Math.random

test("shuffle is deterministic when seeded", () => {
  expect(Random.sample([1, 2, 3, 4, 5], 3)).toEqual(/* same every run */);
});
```

For non-test uses, `Random.uuid()` / `Random.nanoid()` / `Random.token()` use `crypto.randomUUID` / `crypto.getRandomValues` when available — they're safe for ids, not for cryptography:

```ts
Random.uuid();         // "0a8b40e1-..." (RFC 4122 v4)
Random.nanoid(10);     // "rH3kQ_pX7a"
Random.token(16);      // 32-char crypto-backed hex
Random.color();        // "#1f3a8a" (always 6 hex digits)
Random.weighted([
  { value: "free",    weight: 80 },
  { value: "premium", weight: 19 },
  { value: "vip",     weight:  1 },
]);
```

### Deep cloning that actually handles edge cases

```ts
import { clone } from "@mongez/reinforcements";

const a: any = { name: "Ada" };
a.self = a;                  // circular reference
const copy = clone(a);
copy.self === copy;          // true — circular ref preserved correctly

clone(new Date(0));          // new Date instance, same time
clone(/abc/gi);              // new RegExp, same source/flags
clone(new Map([["k", 1]]));  // new Map, deep-cloned values
clone(new Uint8Array([1,2,3])); // new typed array, fresh buffer

const err = new TypeError("nope");
(err as any).meta = { detail: true };
const errCopy = clone(err);  // preserves message, name, stack, AND own props
```

### Pipelines with `pipe` + `tap` for observability

```ts
import { pipe, tap } from "@mongez/reinforcements";

const result = pipe(
  rawInput,
  trim,
  tap.with(s => console.log("after trim:", s)),  // side-effect, passes value through
  toSnakeCase,
  s => s + "_v3",
);
```

### Object change detection — `walk` + `diff`

```ts
import { walk, diff } from "@mongez/reinforcements";

// Log every leaf in a config
walk(config, (value, path) => logger.debug(path, value));

// What changed between two snapshots?
const changes = diff(prevState, nextState);
// { added: { ... }, removed: { ... }, changed: { theme: { from: "light", to: "dark" } } }

for (const key of Object.keys(changes.changed)) {
  audit.log(`${key}: ${changes.changed[key].from} → ${changes.changed[key].to}`);
}
```

### Form names from dot-notation

```ts
import { toInputName } from "@mongez/reinforcements";

toInputName("user.name");          // "user[name]"
toInputName("user.address.city");  // "user[address][city]"
toInputName("user.tags[]");        // "user[tags][]"
```

### Mask PII for logs / display

```ts
import { mask } from "@mongez/reinforcements";

mask("4242424242424242", { start: 0, end: 4 }); // "************4242"
mask("hassanzohdy@gmail.com", { start: 2, end: 10 }); // "ha*********gmail.com"
mask("+201234567890", { start: 4, end: 2, char: "•" }); // "+201•••••••90"
```

### Defer — externally-resolvable promises

Useful when you need to bridge callback APIs to promises or coordinate between concurrent flows:

```ts
import { defer } from "@mongez/reinforcements";

function whenReady(): Promise<void> {
  const d = defer<void>();
  emitter.once("ready", () => d.resolve());
  emitter.once("error", err => d.reject(err));
  return d.promise;
}
```

### Templated strings with dot-notation

```ts
import { template } from "@mongez/reinforcements";

template("Hi {user.name}, you have {count} new {kind}.", {
  user: { name: "Ada" },
  count: 3,
  kind: "messages",
});
// "Hi Ada, you have 3 new messages."
```

### Coalesce — first non-nullish (zero / "" pass through)

Unlike `||`, `coalesce` doesn't fall through on legitimately falsy values:

```ts
import { coalesce } from "@mongez/reinforcements";

coalesce(undefined, null, 0, "fallback"); // 0   (not "fallback")
coalesce(undefined, "", "fallback");      // ""  (not "fallback")
coalesce(null, undefined);                 // undefined
```

---

## API by namespace

Every export is documented with `@example` JSDoc — hover in your editor for full details. Tables below are the index.

### Object

| Function | Description |
| --- | --- |
| `get(obj, path, default?)` | Read by typed dot-notation; falsy values pass through correctly. |
| `set(obj, path, value)` | Write by dot-notation; auto-creates arrays for numeric segments. |
| `has(obj, path)` | True if the path exists (even when the value is `undefined`). |
| `unset(obj, paths)` | Mutating remove by dot-notation. |
| `pick(obj, keys \| predicate)` | New object with only requested keys/paths (or predicate-matching entries). |
| `omit(obj, keys \| predicate)` | New object excluding the given keys/paths. |
| `only` / `except` | Deprecated aliases of `pick` / `omit`. |
| `compact(value, options?)` | Strip nullish / empty-string / empty-container entries. Recursive by default. Keeps `0`/`false`/`NaN`. |
| `merge(...sources, options?)` | Deep merge; arrays via `{ arrays: "replace" \| "concat" \| "union" }`. |
| `clone(value)` | Deep clone — handles Date, RegExp, Error, Map, Set, typed arrays, and circular refs. |
| `flatten(obj, options?)` | `{ separator, keepNested, maxDepth }` — flatten to dot-keyed map. |
| `defaults(target, ...sources)` | Fill `undefined` keys on `target`. |
| `invert(obj)` | Swap keys and values. |
| `mapValues(obj, fn)` / `mapKeys(obj, fn)` | Transform values or keys, return new object. |
| `keys(obj)` / `values(obj)` / `entries(obj)` / `fromEntries(it)` | Typed wrappers. |
| `walk(obj, visitor)` | Recursive leaf traversal with full path. |
| `diff(a, b)` | `{ added, removed, changed }` structural diff. |
| `freeze(obj)` | Recursive `Object.freeze`. |
| `sort(obj, recursive?)` | Return new object with keys alphabetically sorted. |
| `map(obj, callback)` | Map an object to an array via `(key, value, obj)`. |

```ts
import { get, set, pick, merge } from "@mongez/reinforcements";

const settings = merge({ theme: "dark" }, { features: { beta: true } });
const slim = pick(settings, ["theme"]);
const value = get(settings, "features.beta", false);
set(settings, "features.experimental", true);
```

### String

| Function | Description |
| --- | --- |
| `words(str)` | Split into semantic tokens (the foundation for every casing function). |
| `toCamelCase`, `toStudlyCase`, `toPascalCase`, `toSnakeCase`, `toKebabCase`, `toConstantCase`, `toDotCase`, `toPathCase`, `toTitleCase` | Acronym-aware case conversions. |
| `ucfirst(str)` / `capitalize(str)` | Uppercase first char / first char of every word. |
| `trim(str, needle?)` / `ltrim` / `rtrim` | Trim arbitrary characters from both/either side. |
| `replaceAll`, `replaceFirst`, `replaceLast`, `removeFirst`, `removeLast` | String replacement helpers. |
| `repeatsOf(str, needle, caseSensitive?)` | Count occurrences. |
| `slugify(str, options?)` | URL-safe, diacritic-stripping slugger. |
| `truncate(str, length, options?)` | `{ suffix, byWord, position: "end" \| "middle" }`. |
| `readMoreChars` / `readMoreWords` | Truncate by chars / words with suffix. |
| `pad`, `padStart`, `padEnd` | Padding helpers. |
| `mask(str, { start, end, char })` | Mask the middle, keep ends visible. |
| `template(str, vars)` | `{path}` interpolation with dot-notation. |
| `escapeHtml(str)` / `unescapeHtml(str)` | HTML entity escape/unescape. |
| `wordCount(str)` | Count whitespace-separated words. |
| `charCount(str, { unicode? })` | Code-unit or grapheme count. |
| `reverse(str)` | Unicode-safe reverse. |
| `initials(name, separator?)` | First letter of each word. |
| `extension(filename)` | Get the file extension (or `""`). |
| `toInputName(str)` | `"a.b.c"` → `"a[b][c]"` (HTML form names). |
| `startsWithArabic(str, trimmed?)` / `containsArabic(str)` | Arabic-aware detection. |
| `ARABIC_REGEX` | Exported pattern. |

```ts
import { slugify, toTitleCase, mask, template } from "@mongez/reinforcements";

slugify("Café crème");                         // "cafe-creme"
toTitleCase("the lord of the rings");          // "The Lord of the Rings"
mask("4242424242424242", { start: 0, end: 4 }); // "************4242"
template("Welcome {name}!", { name: "Ada" });  // "Welcome Ada!"
```

### Number

| Function | Description |
| --- | --- |
| `round(value, precision?)` / `floor` / `ceil` | Real rounding with precision. |
| `toFixed(value, precision)` | Like `Number.toFixed` but returns a number. |
| `clamp(value, min, max)` | Constrain to range. |
| `inRange(value, min, max, options?)` | Range test (`inclusive` flag). |
| `lerp(a, b, t)` | Linear interpolation. |
| `percentage(value, total, decimals?)` | Safe percentage (0 on divide-by-zero). |
| `safeDivide(a, b, fallback?)` | Safe division. |
| `parseNumber(value, fallback?)` | Permissive numeric parse. |
| `formatBytes(bytes, { decimals, binary? })` | `1500` → `"1.50 KB"` or `"1.46 KiB"`. |
| `formatNumber(value, IntlOptions)` | Intl.NumberFormat wrapper. |

### Mixed

| Function | Description |
| --- | --- |
| `areEqual(a, b)` | Deep value equality (Date, RegExp, Map, Set, circular). Non-mutating. |
| `clone(value)` | See Object section — exported here too. |
| `shuffle(value, { mutate? })` | Fisher–Yates shuffle for arrays or strings. Non-mutating by default. |
| `coalesce(...values)` | First non-nullish (zero/empty-string pass through). |

### Random

```ts
import { Random } from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `Random.int(min?, max?)` | Random integer in inclusive range. |
| `Random.float(min, max, precision?)` | Random float. |
| `Random.bool()` | Coin flip. |
| `Random.string(length?)` | Alphanumeric string. |
| `Random.id(length?, prefix?)` | Prefixed id. |
| `Random.uuid()` | RFC 4122 v4 (uses `crypto.randomUUID` when available). |
| `Random.nanoid(size?)` | URL-safe id. |
| `Random.token(bytes?)` | Crypto-backed hex token. |
| `Random.color()` | Six-digit hex color (no truncation). |
| `Random.date({ min?, max? })` | Random `Date`. |
| `Random.pick(array)` / `Random.sample(array, n)` | Single / multiple unique elements. |
| `Random.weighted([{ value, weight }, …])` | Weighted choice. |
| `Random.seed(seed \| undefined)` | Mulberry32-seeded RNG for reproducible tests. |

### Lazy

```ts
import { lazy, isLazy } from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `lazy(producer)` | Memoised deferred value: `resolve()`, `reset()`, `peek()`, `isResolved()`. |
| `lazy.async(producer)` | Async variant — cached `Promise<T>`. |
| `lazy.from(value)` | Pre-resolved lazy reference for tests/API symmetry. |
| `isLazy(value)` | Type guard. |

```ts
const config = lazy(() => loadHeavyConfig());
config.resolve();   // computes
config.resolve();   // cached
config.reset();     // drop cache; next resolve recomputes
```

### Function utilities

| Function | Description |
| --- | --- |
| `debounce(fn, wait, options?)` | `{ leading, trailing, maxWait }` + `.cancel()` / `.flush()` / `.pending()`. |
| `throttle(fn, wait, options?)` | Leading/trailing throttle + same controls. |
| `memoize(fn, options?)` | Custom `resolver`, optional `ttl`, `clear()` / `forget(key)`. |
| `once(fn)` | Invoke once, cache the result. |
| `after(n, fn)` / `before(n, fn)` | Gate invocation by call count. |
| `pipe(value, …fns)` / `compose(…fns)` | Function composition, fully typed. |
| `tap(value, fn)` / `tap.with(fn)` | Side-effect probe for pipelines. |
| `curry(fn)` | Auto-currying. |
| `partial(fn, …args)` / `partialRight(fn, …args)` | Pre-bind args. |
| `noop` / `identity` / `constant(value)` / `negate(predicate)` | Tiny helpers. |
| `escapeRegex(str)` | Regex meta-character escape. |

```ts
const onSearch = debounce(query => fetch(query), 300);
onSearch("ad"); onSearch("ada"); // 300ms later: fetches "ada"

const slow = memoize((id: string) => fetchUser(id), { ttl: 60_000 });
```

### Async

```ts
import {
  sleep, retry, timeout, pAll, pAllSettled, pMap, pProps, pSeries, pFilter,
  defer, debounceAsync,
} from "@mongez/reinforcements";
```

| Function | Description |
| --- | --- |
| `sleep(ms, value?)` | `await sleep(100)`. |
| `retry(fn, options?)` | `{ attempts, delay, backoff: "linear" \| "exponential", onError }`. |
| `timeout(promise, ms, message?)` | Race against a timer. |
| `pAll(promises)` | Tuple-preserving `Promise.all`. |
| `pAllSettled(promises)` | Tuple-preserving `Promise.allSettled`. |
| `pMap(items, mapper, { concurrency })` | Bounded concurrent map (preserves order). |
| `pProps(object)` | Parallel object destructuring: `const { user, settings } = await pProps({ user: ..., settings: ... })`. |
| `pSeries(items, mapper)` | Sequential map. |
| `pFilter(items, predicate, { concurrency? })` | Async filter. |
| `defer<T>()` | Externally-resolvable promise (`promise`, `resolve`, `reject`). |
| `debounceAsync(fn, wait)` | Async-aware debounce; bursts resolve to the final call. |

### Types

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
type User = { id: number; profile: { email: string } };
type UserPath  = Path<User>;                       // "id" | "profile" | "profile.email"
type EmailType = PathValue<User, "profile.email">; // string
```

---

## TypeScript

Most utilities accept and return precise generics — `pick`, `omit`, `merge`, `get`, `set`, `entries`, `keys`, `values`, `mapValues`, `mapKeys`, `freeze`, `invert`, `clone`, `lazy`, `pipe`, `compose`, and all async helpers preserve input shape in their output type.

`get(obj, path)` will autocomplete every legal dot-notation path on `obj` and resolve the path's exact value type as the return type.

---

## Migrating from v2

The v3 release fixes a handful of long-standing bugs (notably the acronym-eating casing functions and the order-insensitive `areEqual`) and renames `only`/`except` to `pick`/`omit`. The deprecated names still work; full guide in [`MIGRATION.md`](./MIGRATION.md).

---

## Contributing

```sh
yarn test            # single run
yarn test:watch      # watch mode
yarn test:coverage   # v8 coverage
yarn test:ui         # interactive UI
```

## License

MIT © [Hassan Zohdy](https://github.com/hassanzohdy)
