---
name: mongez-reinforcements-overview
description: |
  High-level orientation to @mongez/reinforcements — a ~130-function TypeScript utility belt covering objects, strings, numbers, async, randomness, and functional composition.
---

# @mongez/reinforcements — Overview

A TypeScript utility belt. ~130 functions for objects, strings, numbers, async, randomness, and functional composition. Path-first object access, smart string casings, real concurrency helpers, deterministic randomness — all from one import, all tree-shakable, all typed.

## Highlighted features

<div class="mongez-highlights">

<div class="mongez-highlight" data-accent="ice">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
  <h3>~130 typed helpers</h3>
  <p>One install replaces a handful of lodash modules — and ships with TypeScript-first signatures, not adapter packages.</p>
</div>

<div class="mongez-highlight" data-accent="ice">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
  <h3>Path-first object access</h3>
  <p><code>get(user, "profile.email")</code> autocompletes every legal dot-notation path and infers the value type — no <code>as</code> casts, no manual generics.</p>
</div>

<div class="mongez-highlight" data-accent="fire">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7V4h16v3"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
  <h3>Smart string casings</h3>
  <p>The casing family shares one <code>words()</code> tokenizer that handles acronyms correctly: <code>AIAgent</code> → <code>["AI","Agent"]</code>, not <code>["A","I","Agent"]</code>.</p>
</div>

<div class="mongez-highlight" data-accent="fire">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><polyline points="21 3 21 8 16 8"/></svg>
  <h3>Async helpers that scale</h3>
  <p><code>retry</code> with backoff, <code>pMap</code> with concurrency caps, <code>timeout</code>, <code>defer</code>, <code>sleep</code> — without pulling in the whole p-* ecosystem.</p>
</div>

<div class="mongez-highlight" data-accent="bolt">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
  <h3><code>Random</code> namespace</h3>
  <p><code>Random.int(1, 10)</code>, <code>Random.uuid()</code>, <code>Random.sample(arr)</code>, <code>Random.seed(n)</code> for deterministic test fixtures. Namespace class, never <code>new</code>.</p>
</div>

<div class="mongez-highlight" data-accent="bolt">
  <svg class="mongez-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  <h3><code>lazy</code> breaks cycles</h3>
  <p>The one tool that resolves ES-module circular imports cleanly — defer evaluation until first read.</p>
</div>

</div>

## Install

```sh
npm install @mongez/reinforcements
# or: yarn add @mongez/reinforcements
# or: pnpm add @mongez/reinforcements
```

## Quick peek

```ts
import { get, slugify, debounce, retry, pMap, Random } from "@mongez/reinforcements";

const email = get(user, "profile.email");                  // typed by path
const slug  = slugify("Café & Croissant");                 // "cafe-croissant"
const save  = debounce(persist, 500, { maxWait: 3_000 }); // cancel / flush / pending
const data  = await retry(() => fetch(url), { attempts: 5 });
const docs  = await pMap(urls, fetch, { concurrency: 5 });
const id    = Random.uuid();
```

A taste of the breadth — typed path access, casing, debouncing, retries, parallel mapping, and randomness all from one import.

## Namespaces

| Namespace | Count | Examples |
|---|---|---|
| `object` | 24 | `get`, `set`, `pick`, `omit`, `compact`, `merge`, `clone`, `flatten`, `walk`, `diff` |
| `string` | ~45 | Casing family, `slugify`, `truncate`, `template`, `mask`, `stripHtmlTags` |
| `number` | 12 | `round`, `clamp`, `formatBytes`, `percentage`, `safeDivide` |
| `array` | 18 | `chunk`, `range`, `unique`, `pluck`, `groupBy`, `sum` |
| `random` | 14 | `Random.int`, `Random.uuid`, `Random.sample`, `Random.seed` |
| `function` | 17 | `debounce`, `throttle`, `memoize`, `pipe`, `curry`, `once` |
| `async` | 11 | `sleep`, `retry`, `timeout`, `pMap`, `pProps`, `pFilter`, `defer` |
| `types` | 16 | `Path`, `PathValue`, `DeepPartial`, `Branded`, `Prettify` |
| `lazy` | 1 + variants | `lazy`, `lazy.async`, `lazy.from`, `isLazy` |
| `mixed` | 4 | `clone`, `areEqual`, `shuffle`, `coalesce` |

## Scope boundaries

| Concern | Lives in | Why |
|---|---|---|
| Type/shape predicates (`isString`, `isEmpty`, `isURL`, …) | [`@mongez/supportive-is`](/supportive-is/overview/) | Single-purpose package |
| Array collection helpers (`partition`, `keyBy`, `sortBy`, …) | [`@mongez/collection`](/collection/overview/) | Richer collection model |
| HTML sanitization | Use `DOMPurify` | Parser-based, not regex |
| Schema validation | Use `zod` / `valibot` | Out of scope |
| Date manipulation | Use `dayjs` / `date-fns` / `Temporal` | Out of scope |

## Where to go next

- **[Arrays](../arrays/)**, **[Objects](../objects/)**, **[Strings](../strings/)**, **[Numbers](../numbers/)** — per-type reference
- **[Async](../async/)**, **[Functions](../functions/)**, **[Random](../random/)**, **[Types](../types/)** — specialised utilities
- **[Lazy values](../lazy/)** — break ES-module cycles
- **[Recipes](../recipes/)** — common compositions
