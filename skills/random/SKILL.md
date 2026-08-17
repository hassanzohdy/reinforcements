---
name: mongez-reinforcements-random
description: |
  Random value generation via the Random namespace class from @mongez/reinforcements — integers, floats, booleans, strings, UUIDs, nanoids, dates, colors, weighted picks, and seedable deterministic mode.
---
# Random

Namespace class — every method is `public static`. Not instantiable.

```ts
import { Random, type RandomDateOptions, type WeightedItem } from "@mongez/reinforcements";
```

## Seeding (reproducible mode)

```ts
Random.seed(seed?: number): void
```

Switches the RNG to a deterministic mulberry32 PRNG. Call with no args (or `undefined`) to restore `Math.random`.

```ts
Random.seed(42);
const a = Random.int(1, 1000);

Random.seed(42);
const b = Random.int(1, 1000);

a === b;          // true
Random.seed();    // back to Math.random
```

Great for fixture-based tests:

```ts
beforeEach(() => Random.seed(123));
afterEach(()  => Random.seed());
```

`seed` only affects `int` / `float` / `bool` / `pick` / `sample` / `weighted` / `date` / `color`. **`string`, `id`, `nanoid`, `token`, and `uuid` are CSPRNG-backed and ignore the seed entirely** — see below.

## Primitives

```ts
Random.int(min?: number, max?: number): number          // default [1, 9999999], inclusive
Random.float(min?: number, max?: number, precision?: number): number  // default [0, 1)
Random.bool(): boolean
```

```ts
Random.int(1, 10);          // e.g. 7
Random.float(0, 1, 2);      // e.g. 0.42
Random.bool();              // true or false
```

## Strings & ids

```ts
Random.string(length?: number): string                  // alphanumeric, default 32
Random.id(length?: number, startsWith?: string): string // default 6, "el-"
Random.uuid(): string                                   // RFC 4122 v4 (crypto.randomUUID when available)
Random.nanoid(size?: number): string                    // URL-safe, default 21
Random.token(bytes?: number): string                    // crypto-backed hex, default 16
```

```ts
Random.string(8);          // e.g. "Xk2pQ9aZ"
Random.id();               // e.g. "el-X4kP2a"
Random.id(4, "user-");     // e.g. "user-q7Zw"
Random.uuid();             // "0a8b40e1-d3ef-4d2e-87f4-1a8b40e1d3ef"
Random.nanoid(10);         // "rH3kQ_pX7a"
Random.token(16);          // 32-char hex
```

**`string`, `id`, `nanoid`, and `token` are always CSPRNG-backed** (`crypto.getRandomValues`) — never drawn from the seedable PRNG, even under `Random.seed(n)`. `uuid` uses `crypto.randomUUID` when available, otherwise `crypto.getRandomValues`. All five **throw `"No CSPRNG available: crypto.getRandomValues is required"`** on a runtime with no WebCrypto (pre-ES2020 browsers, Node < 15 without a `crypto` global) — they never silently degrade to a predictable generator.

> **Breaking change (v4):** prior to v4, `string`/`id`/`nanoid`/`token`/`uuid` fell back to the internal PRNG and therefore *could* be seeded/reproduced under test. That fallback was a security bug — a predictable "random" identifier is exploitable wherever it's used as a token, invite code, or session-adjacent value. If you relied on seeded output from these five methods for fixtures, generate fixture values a different way (a fixed literal, a counter, or an explicitly-seeded UUID library) — do not reach for `Random.seed()` expecting them to comply.

**Use for ids only**, not for cryptographic key/token material beyond opaque identifiers — for anything security-sensitive, prefer the Web Crypto API directly and document the derivation.

## Dates & colors

```ts
Random.date(options?: RandomDateOptions): Date
type RandomDateOptions = { min?: Date; max?: Date };

Random.color(): string  // "#rrggbb", always 6 hex digits
```

```ts
Random.date({ min: new Date("2020-01-01"), max: new Date("2024-12-31") });
Random.color(); // e.g. "#1f3a8a"
```

## Pick / sample / weighted

```ts
Random.pick<T>(array: readonly T[]): T | undefined
Random.sample<T>(array: readonly T[], n: number): T[]                          // n unique elements
Random.weighted<T>(items: readonly WeightedItem<T>[]): T | undefined
type WeightedItem<T> = { value: T; weight: number };
```

```ts
Random.pick(["a", "b", "c"]);              // e.g. "b"
Random.sample([1, 2, 3, 4, 5], 3);         // e.g. [3, 1, 5]
Random.weighted([
  { value: "free",    weight: 80 },
  { value: "premium", weight: 19 },
  { value: "vip",     weight:  1 },
]);                                         // weighted choice
```

`sample` returns at most `array.length` items. Negative weights in `weighted` are clamped to `0`; if every weight is `0` returns `undefined`.

## Gotchas

- `Random` is **not instantiable** — `new Random()` is a TS error. Use the static methods directly.
- The legacy aliases `Random.integer` / `Random.boolean` from v2 are **removed**. Use `Random.int` / `Random.bool`.
- Seeded mode persists until cleared — call `Random.seed()` (no args) in `afterEach` to avoid cross-test contamination. Seeding has **no effect** on `string` / `id` / `nanoid` / `token` / `uuid`.
- `Random.string` / `id` / `nanoid` / `token` / `uuid` **throw** on a runtime without `crypto.getRandomValues` — wrap calls in test environments that stub out WebCrypto, or polyfill it.
