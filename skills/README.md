# `@mongez/reinforcements` — AI Agent Skills

Reference cards for AI agents working with this package. Each file is **self-contained** — load only what you need.

## How to use

- For a specific category, fetch only that file. The cards are dense but complete.
- For an unfamiliar problem, start with [`overview.md`](./overview.md) to understand the scope, then drill into the relevant category.
- For idiomatic combinations across categories, see [`recipes.md`](./recipes.md).

## Index

| File | Covers | Load when |
|---|---|---|
| [`overview.md`](./overview.md) | Package pitch, install, scope boundaries (what's in / what's not) | First touch |
| [`arrays.md`](./arrays.md) | `chunk`, `range`, `unique`, `pluck`, `groupBy`, `sum`, `average`, … | Array shaping, stats, filtering by parity |
| [`objects.md`](./objects.md) | `get`/`set`/`has`, `pick`/`omit`, `merge`, `flatten`, `walk`, `diff`, `mapValues`, … | Object reads/writes, transforms, comparison |
| [`strings.md`](./strings.md) | Casing family, `slugify`, `truncate`, `template`, `mask`, `escapeHtml`, `stripHtmlTags`, … | Any string manipulation |
| [`numbers.md`](./numbers.md) | `round`/`floor`/`ceil`, `clamp`, `formatBytes`, `formatNumber`, `safeDivide`, … | Number formatting, math, range checks |
| [`mixed.md`](./mixed.md) | `clone`, `areEqual`, `shuffle`, `coalesce` | Deep clone, deep equality, randomization |
| [`random.md`](./random.md) | `Random.int/float/uuid/nanoid/pick/sample/weighted/seed`, … | Any RNG, including reproducible test seeding |
| [`lazy.md`](./lazy.md) | `lazy`, `lazy.async`, `lazy.from`, `isLazy` | Deferred computation, breaking circular imports |
| [`functions.md`](./functions.md) | `debounce`, `throttle`, `memoize`, `pipe`, `compose`, `once`, `curry`, … | Function combinators, rate-limiting, caching |
| [`async.md`](./async.md) | `sleep`, `retry`, `timeout`, `pMap`, `pSeries`, `pFilter`, `defer`, `debounceAsync` | Async control flow, concurrency, retries |
| [`types.md`](./types.md) | `Path<T>`, `PathValue`, `DeepPartial`, `Branded`, `Prettify`, … | TypeScript-level utilities |
| [`recipes.md`](./recipes.md) | Cross-namespace compositions for common real-world tasks | Designing a flow that spans categories |

## Quick rules

1. **Imports are always flat from the package root** — `import { clone, get } from "@mongez/reinforcements"`. Subpath imports are not the supported entry point.
2. **Tree-shake friendly** — every utility is a separate file under the hood; importing one doesn't pull others.
3. **No `any` in public signatures** — generics preserve input types in returns.
4. **Non-mutating by default** — utilities that historically mutated (`shuffle`, `areEqual`) no longer do.
5. **Out of scope:** type/shape predicates (`isString`, `isEmpty`, …) live in `@mongez/supportive-is`. Array collection helpers live in `@mongez/collections`.
