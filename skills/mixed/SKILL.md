---
name: mongez-reinforcements-mixed
description: |
  Cross-type utilities from @mongez/reinforcements — deep clone(), deep equality areEqual(), Fisher-Yates shuffle(), and null-safe coalesce().
---
# Mixed

Deep clone, deep equality, shuffle, coalesce. Import from `@mongez/reinforcements`.

## `clone` — deep copy

```ts
clone<T>(value: T): T
```

Handles `Date`, `RegExp`, `Error` (with own props), `Map`, `Set`, typed arrays, `ArrayBuffer`, and **circular references** via internal `WeakMap`. Non-plain class instances are **returned by reference** (cloning user constructors is out of scope — call your own `.clone()` if you have one).

```ts
const a: any = { name: "Ada" };
a.self = a;            // circular
const copy = clone(a);
copy.self === copy;    // true — circular ref preserved

clone(new Date(0));    // new Date instance, same time
clone(/abc/gi);        // new RegExp, same source/flags
clone(new Map([["k", 1]])); // new Map, deep-cloned values

const err = new TypeError("nope");
(err as any).meta = { detail: true };
clone(err).meta;       // { detail: true } — own props preserved
```

## `areEqual` — deep value equality

```ts
areEqual(a: any, b: any): boolean
```

Non-mutating deep equality. **Respects element order in arrays.** Handles `Date`, `RegExp`, `Map`, `Set`, and circular references.

```ts
areEqual({ a: 1 }, { a: 1 });        // true
areEqual([1, 2, 3], [1, 2, 3]);      // true
areEqual([1, 2, 3], [3, 2, 1]);      // false — order matters

areEqual(new Date(0), new Date(0));  // true
areEqual(/abc/g, /abc/g);            // true
areEqual(new Set([1, 2]), new Set([2, 1])); // true (Set equality)

const a: any = { x: 1 }; a.self = a;
const b: any = { x: 1 }; b.self = b;
areEqual(a, b);                       // true — circular-safe
```

> This is a **value comparator**, not a type/shape predicate. For predicates like `isEmpty` / `isPlainObject`, use `@mongez/supportive-is`.

## `shuffle` — Fisher–Yates

```ts
shuffle<T>(value: T[], options?: { mutate?: boolean }): T[]
shuffle(value: string, options?: { mutate?: boolean }): string
```

Non-mutating by default. Pass `{ mutate: true }` to shuffle the array in place.

```ts
shuffle([1, 2, 3, 4]);                  // e.g. [3, 1, 4, 2]; original untouched
shuffle("hello");                        // e.g. "lehlo"
shuffle(arr, { mutate: true });          // shuffles in place, returns arr
```

## `coalesce` — first non-nullish

```ts
coalesce<T>(...values: Array<T | null | undefined>): T | undefined
```

Returns the first value that isn't `null` or `undefined`. **Falsy-but-defined values** (`0`, `""`, `false`, `NaN`) pass through — unlike `||`.

```ts
coalesce(null, undefined, "first");  // "first"
coalesce(undefined, 0, "x");         // 0
coalesce(undefined, "", "x");        // ""
coalesce(null, undefined);           // undefined
```
