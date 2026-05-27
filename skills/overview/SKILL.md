---
name: mongez-reinforcements-overview
description: |
  High-level orientation to @mongez/reinforcements — what the package contains, how to install it, and where each utility namespace lives.
  TRIGGER when: code first imports anything from `@mongez/reinforcements` and orientation is needed; user asks "what is @mongez/reinforcements / how do I install it / what does this package do / which @mongez package should I use for X"; package.json adds `"@mongez/reinforcements"` as a dependency.
  SKIP: a specific namespace skill (objects, strings, numbers, arrays, async, functions, lazy, random, mixed, types, recipes) already covers the user's concrete task — load that one directly; questions about unrelated `@mongez/*` packages (`@mongez/supportive-is`, `@mongez/collection`) beyond brief scope-boundary mentions.
---
# Overview

`@mongez/reinforcements` is a TypeScript utility belt — ~130 functions for objects, strings, numbers, async, randomness, and functional composition.

## Install

```sh
# npm
npm install @mongez/reinforcements

# yarn
yarn add @mongez/reinforcements

# pnpm
pnpm add @mongez/reinforcements
```

## Quick example

A taste of the breadth — typed path access, casing, debouncing, retries, parallel mapping, and randomness all from one import:

```ts
import { get, slugify, debounce, retry, pMap, Random } from "@mongez/reinforcements";

const email = get(user, "profile.email");                   // typed by path
const slug  = slugify("Café & Croissant");                  // "cafe-croissant"
const save  = debounce(persist, 500, { maxWait: 3_000 });   // cancel / flush / pending
const data  = await retry(() => fetch(url), { attempts: 5 });
const docs  = await pMap(urls, fetch, { concurrency: 5 });
const id    = Random.uuid();
```

## Import pattern

Everything is exported from the package root:

```ts
import {
  get, set, has, pick, omit, compact, merge, clone, areEqual,
  toCamelCase, slugify, truncate, template,
  clamp, formatBytes, percentage,
  debounce, throttle, memoize, pipe,
  sleep, retry, pMap, pProps, defer,
  Random, lazy,
  type Path, type PathValue, type DeepPartial,
} from "@mongez/reinforcements";
```

## Namespaces

| Namespace | Count | Examples |
|---|---|---|
| `object` | 24 | `get`, `set`, `pick`, `omit`, `compact`, `merge`, `clone`, `flatten`, `walk`, `diff` |
| `string` | ~45 | Casing family, `slugify`, `truncate`, `template`, `mask`, `stripHtmlTags` |
| `number` | 12 | `round`, `clamp`, `formatBytes`, `percentage`, `safeDivide` |
| `mixed` | 4 | `clone`, `areEqual`, `shuffle`, `coalesce` |
| `array` | 18 | `chunk`, `range`, `unique`, `pluck`, `groupBy`, `sum` |
| `random` | 14 | `Random.int`, `Random.uuid`, `Random.sample`, `Random.seed` |
| `lazy` | 1 + variants | `lazy`, `lazy.async`, `lazy.from`, `isLazy` |
| `function` | 17 | `debounce`, `throttle`, `memoize`, `pipe`, `curry`, `once` |
| `async` | 11 | `sleep`, `retry`, `timeout`, `pMap`, `pProps`, `pFilter`, `defer` |
| `types` | 16 | `Path`, `PathValue`, `DeepPartial`, `Branded`, `Prettify` |

## Scope boundaries

| Concern | Lives in | Why |
|---|---|---|
| Type/shape predicates (`isString`, `isEmpty`, `isURL`, …) | `@mongez/supportive-is` | Single-purpose package |
| Array collection helpers (`partition`, `keyBy`, `sortBy`, …) | `@mongez/collection` | Richer collection model |
| HTML sanitization | Use `DOMPurify` | Parser-based, not regex |
| Schema validation | Use `zod` / `valibot` | Out of scope |
| Date manipulation | Use `dayjs` / `date-fns` / `Temporal` | Out of scope |
| HTTP/fetch helpers | Separate concern | Out of scope |

## Mental model

- **Object utilities** prefer **paths over keys** — dot-notation is first-class.
- **String casings** are powered by a shared `words()` tokenizer that handles acronyms correctly (`AIAgent` → `["AI", "Agent"]`).
- **Async helpers** mirror common needs without re-implementing the whole Bluebird/p-* ecosystem.
- **`Random`** is a namespace class — `Random.int(1, 10)`, never `new Random()`.
- **`lazy`** is the unique tool for breaking ES-module circular imports.

## TypeScript

`get(obj, path)` autocompletes every legal dot-notation path on `obj` and infers the value type. Generics flow through `pick`, `omit`, `merge`, `clone`, `keys`, `values`, `entries`, `mapValues`, `pipe`, `compose`, and the async helpers.

```ts
type User = { profile: { email: string } };
const u: User = { profile: { email: "x@y.z" } };

get(u, "profile.email"); // typed as string
```
