# Migration Guide

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
