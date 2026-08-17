# Migration Guide

## 3.x → 4.0

Security release. Most consumers are unaffected — the prototype-pollution guards and the `repeatsOf` ReDoS fix are pure hardening with no API change. The one breaking change is in `Random`.

### Breaking: `Random.string` / `id` / `nanoid` / `token` / `uuid` are no longer seedable

These five now always draw from the runtime CSPRNG (`crypto.getRandomValues` / `crypto.randomUUID`) instead of falling back to the seedable PRNG when no CSPRNG was present.

```diff
  Random.seed(42);
- Random.uuid();   // was reproducible if no CSPRNG was present; now always crypto-random
+ Random.uuid();   // always crypto-random — Random.seed() no longer affects it
```

**Who is affected:** only code that relied on `Random.seed(n)` to make `string`/`id`/`nanoid`/`token`/`uuid` output reproducible (e.g. golden-file fixtures, snapshot tests asserting an exact generated id). `int`/`float`/`bool`/`pick`/`sample`/`weighted`/`date`/`color` are unchanged and remain seedable.

**What to do:** stop seeding for these five and use a fixed literal, an incrementing counter, or an explicitly-seeded id library for reproducible fixtures instead:

```diff
- Random.seed(42);
- const id = Random.nanoid(); // used to be deterministic in some environments
+ const id = "test-nanoid-fixture"; // deterministic fixture, not generated
```

### Breaking (environment-dependent): these five now throw without a CSPRNG

`Random.string`, `Random.id`, `Random.nanoid`, `Random.token`, and `Random.uuid` throw `"No CSPRNG available: crypto.getRandomValues is required"` on a runtime that exposes no `crypto.getRandomValues` (very old browsers, or Node < 15 without a global `crypto`). Previously they degraded silently to a predictable generator instead of failing loudly. If you target such a runtime, polyfill `crypto.getRandomValues` or avoid these five methods there.

### Non-breaking hardening

- **`set` / `pick` / `omit`** reject dot-paths containing a `__proto__`, `constructor`, or `prototype` segment (`set` returns the object unchanged instead of writing through to a prototype).
- **`merge` / `defaults`** skip `__proto__` / `constructor` / `prototype` source keys instead of copying them.
- **`repeatsOf`** now escapes `needle` before compiling it into a `RegExp` — always a literal match, never regex injection or ReDoS.

None of the above change return values for any input that wasn't already an attempted prototype-pollution or regex-injection payload.

## 2.x → 3.0

This major release fixes long-standing bugs in casing, equality, cloning, and merging; introduces ~80 new utilities; and tightens types throughout. Most consumers will only feel the renames below.

### Renames (deprecated, not yet removed)

| 2.x | 3.0 |
|---|---|
| `only(obj, keys)` | `pick(obj, keys)` |
| `except(obj, keys)` | `omit(obj, keys)` |
| `ARABIC_PATTERN` | `ARABIC_REGEX` |
| `Random.integer(...)` | `Random.int(...)` *(integer removed)* |
| `Random.boolean()` | `Random.bool()` *(boolean removed)* |

The deprecated names still work but emit `@deprecated` JSDoc warnings. Plan to migrate before the next major.

### Signature changes (breaking)

#### `flatten`

```diff
- flatten(obj, "/", true, "root", {});
+ flatten(obj, { separator: "/", keepNested: true });
```

The recursion-internal `parent` and `root` arguments are no longer part of the public API.

#### `merge`

```diff
- merge(null, { a: 1 }); // returned null
+ merge(null, { a: 1 }); // returns { a: 1 }
```

Array merging is now configurable via a final options object:

```ts
merge({ list: [1, 2] }, { list: [3, 4] });                       // { list: [3, 4] }     replace (default)
merge({ list: [1, 2] }, { list: [3, 4] }, { arrays: "concat" }); // { list: [1, 2, 3, 4] }
merge({ list: [1, 2] }, { list: [2, 3] }, { arrays: "union" });  // { list: [1, 2, 3] }
```

#### `shuffle`

Non-mutating by default. Pass `{ mutate: true }` to restore in-place behavior.

```diff
- const out = shuffle(arr);          // mutated arr
+ const out = shuffle(arr);          // arr untouched, returns new array
+ const out = shuffle(arr, { mutate: true }); // mutates arr, returns arr
```

#### `Random.date()`

```diff
- Random.date(minDate, maxDate);
+ Random.date({ min: minDate, max: maxDate });
```

### Behavior fixes (likely to surface as test changes)

- **`toSnakeCase` / `toKebabCase` / `toCamelCase` / `toStudlyCase`** correctly handle acronyms:
  - `toSnakeCase("AIAgent")` → `"ai_agent"` (was `"agent"`)
  - `toSnakeCase("XMLHttpRequest")` → `"xml_http_request"` (was `"request"`)
  - `toCamelCase("parseURL")` → `"parseUrl"` (was `"parse"`)
- **`areEqual`** respects array order: `[1, 2, 3]` ≠ `[3, 2, 1]`. The old behavior sorted before comparing, which conflated value equality with set equality.
- **`areEqual`** no longer mutates inputs.
- **`get`** consistently returns falsy values (`0`, `false`, `""`) instead of triggering the `defaultValue` branch.
- **`set`** creates arrays when the next segment is a numeric index: `set({}, "users.0.name", "Ada")` → `{ users: [{ name: "Ada" }] }`.
- **`round`** actually rounds (was `Math.floor` underneath).
- **`Random.color()`** always returns six hex digits.

### New surface

See [`CHANGELOG.md`](CHANGELOG.md) for the full list. Most useful additions:

- `Path<T>`, `PathValue<T, P>` for typed dot-notation.
- Object: `has`, `mapValues`, `mapKeys`, `invert`, `defaults`, `walk`, `diff`, `freeze`.
- String: `words`, `slugify`, `truncate`, `template`, `mask`, casing family on the shared tokenizer.
- Number: `clamp`, `inRange`, `lerp`, `formatBytes`, `formatNumber`, `percentage`, `safeDivide`, `parseNumber`, `ceil`, `floor`.
- Function: `throttle`, `memoize`, `pipe`, `compose`, `tap`, `curry`, `partial`, `partialRight`, `once`, `after`, `before`, `noop`, `identity`, `constant`, `negate`.
- Async: `sleep`, `retry`, `timeout`, `pAll`, `pAllSettled`, `pMap`, `pSeries`, `pFilter`, `defer`, `debounceAsync`.
- Random: `pick`, `sample`, `weighted`, `uuid`, `nanoid`, `token`, `float`, `seed`.
- Lazy: `lazy.async`, `lazy.from`.
- Mixed: `coalesce`.

### Testing

The package now uses Vitest internally (instead of Jest). Consumers are unaffected. Contributor scripts:

```sh
yarn test            # single run
yarn test:watch      # watch mode
yarn test:coverage   # v8 coverage
yarn test:ui         # interactive UI
```
