---
description: "Zero-dependency utility belt of small pure functions for arrays, objects, strings, numbers, async flow and function wrappers. Exports `get`, `set`, `pick`, `omit`, `merge`, `groupBy`, `chunk`, `unique`, `toKebabCase`, `slugify`, `debounce`, `pMap`, `clone`. Use for: \"lodash alternative\", \"deep get or set by dot path\", \"group or chunk an array\", \"slugify or change string case\", \"format bytes or duration\", \"run promises with concurrency\", \"debounce or memoize\", \"random data\". Not this package: type-check predicates like isEmpty, isEmail, isPlainObject → @mongez/supportive-is."
---
# @mongez/reinforcements

Named-export helpers, one function per file, grouped by domain. Import only what you use. There is no chained wrapper object, so compose with `pipe` or plain calls.

## The 80% path
1. Orient with `overview.md`, then pick the domain topic.
2. Collections: `arrays.md`, `objects.md` (dot-path `get`/`set`/`unset`, `pick`, `merge`).
3. Text and numbers: `strings.md`, `numbers.md`.
4. Flow control: `functions.md` (debounce, memoize, once, pipe), `async.md` (pMap, poll), `lazy.md`.
5. Values and data: `mixed.md` (clone, areEqual), `random.md`, `types.md`.
6. Worked examples: `recipes.md`.

## Conventions and pitfalls
- The names `map`, `keys`, `values`, `entries`, `min`, `max` and `sum` are exported as functions and collide easily with locals; alias on import.
- `set` and `unset` mutate and return the input object; `merge` returns a new merged result and does not modify its sources.
- Object helpers take dot paths (`"user.address.city"`), not arrays.
- There are no `is*` predicates here; those live in @mongez/supportive-is.
- `pMap` and `pFilter` accept a `concurrency` option, and `pMap` preserves input order (see `async.md`).
