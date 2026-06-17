---
name: mongez-reinforcements-objects
description: |
  Deep path-aware object utilities from @mongez/reinforcements — get/set/has/unset, pick/omit, compact, merge, clone, flatten, walk, diff, and more.
---
# Objects

Path-aware reads/writes, deep transforms, structural diff. Import from `@mongez/reinforcements`.

## Path access — `get` / `set` / `has` / `unset`

#### `get`

```ts
get<T, P extends Path<T>>(obj: T, path: P, default?): PathValue<T, P>
get<T = any>(obj: any, path: string, default?: T): T
```

Read by typed dot-notation. Falsy values pass through correctly (no spurious default-substitution on `0` / `""` / `false`).

```ts
get({ user: { email: "ada@x.com" } }, "user.email"); // "ada@x.com"
get({ user: {} }, "user.email", "n/a"); // "n/a"
get(arr, "0.name"); // numeric segments index arrays
```

#### `set`

```ts
set<T>(obj: T, path: string, value: unknown): T
```

Mutating write by dot-notation. **Auto-creates arrays** when the next segment is a numeric index.

```ts
set({}, "users.0.name", "Ada"); // { users: [{ name: "Ada" }] }
set(obj, "a.b.c", 1);            // creates a.b.c chain
```

#### `has`

```ts
has(obj: any, path: string): boolean
```

`true` if the path exists, **even when the value is `undefined`**. Use this to distinguish "missing" from "present-but-undefined".

```ts
has({ a: { b: 1 } }, "a.b");         // true
has({ a: { b: undefined } }, "a.b"); // true
has({ a: {} }, "a.b");               // false
```

#### `unset`

```ts
unset<T>(obj: T, paths: readonly string[]): T
```

Mutating remove by dot-notation. Returns the same reference.

```ts
unset({ a: 1, b: 2 }, ["a"]);          // { b: 2 }
unset({ a: { b: 1, c: 2 } }, ["a.b"]); // { a: { c: 2 } }
```

## Key selection — `pick` / `omit`

#### `pick`

```ts
pick<T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K>
pick(obj, keys: string[]): Record<string, any>     // supports dot-notation paths
pick(obj, predicate: (value, key) => boolean): Record<string, any>
```

```ts
pick({ a: 1, b: 2, c: 3 }, ["a", "c"]);         // { a: 1, c: 3 }
pick({ a: { b: 1, c: 2 } }, ["a.b"]);           // { a: { b: 1 } }
pick({ a: 1, b: 2, c: 3 }, v => v > 1);         // { b: 2, c: 3 }
```

#### `omit`

```ts
omit<T, K extends keyof T>(obj: T, keys: readonly K[]): Omit<T, K>
omit(obj, keys: string[]): Record<string, any>     // supports dot-notation paths
omit(obj, predicate: (value, key) => boolean): Record<string, any>
```

Non-mutating; returns a shallow clone minus the keys/paths.

```ts
omit({ a: 1, b: 2 }, ["b"]);                    // { a: 1 }
omit({ a: { b: 1, c: 2 } }, ["a.b"]);           // { a: { c: 2 } }
omit({ a: 1, b: 2 }, (_, k) => k === "a");      // { b: 2 }
```

> `only` and `except` are kept as **`@deprecated` aliases** of `pick` and `omit` — prefer the new names.

## Cleanup — `compact`

#### `compact`

```ts
compact<T extends Record<string, any>>(obj: T, options?: CompactOptions): Partial<T>
compact<T>(array: T[], options?: CompactOptions): T[]

type CompactOptions = {
  predicate?: (value: any) => boolean;  // default: nullish or ""
  empties?: boolean;                    // default: true — drop [] and {} too
  deep?: boolean;                       // default: true
};
```

Strip "empty" entries from objects/arrays. Default predicate drops `null`, `undefined`, and `""` only — **keeps `0`, `false`, `NaN`** because those are usually meaningful. With `empties` and `deep` on by default, parent containers that become empty after recursion are themselves dropped.

```ts
compact({ name: "Ada", email: "", phone: null, age: 0 });
// { name: "Ada", age: 0 }

compact({ user: { name: "Ada", email: "" }, meta: {} });
// { user: { name: "Ada" } }

compact(["a", "", null, "b"]);
// ["a", "b"]

compact({ a: 0, b: -1 }, { predicate: v => v === -1 });
// { a: 0 }

compact({ tags: [], name: "Ada" }, { empties: false });
// { tags: [], name: "Ada" }
```

Typical uses: cleaning API request payloads, building query strings from filter objects, sanitizing form data.

## Conditional construction — `when`

#### `when`

```ts
when<T extends object>(condition: unknown, value: T | (() => T)): Partial<T>
```

Return `value` when `condition` is truthy, otherwise `{}`. Built for **inline conditional spreading** — a key is only present when the condition holds. The value may be a **factory function**, invoked lazily and only when the condition is truthy, so the cost of building it is skipped otherwise.

```ts
const payload = {
  name: "Ada",
  ...when(isAdmin, { role: "admin" }),
};
// isAdmin === true  -> { name: "Ada", role: "admin" }
// isAdmin === false -> { name: "Ada" }

// Lazy value — buildHeavyConfig() runs only when `ready` is truthy.
when(ready, () => ({ config: buildHeavyConfig() }));
```

Cleaner than `...(condition && { … })` (which can spread `false`) and reads as intent at the call site.

## Deep transforms — `merge` / `clone` / `flatten` / `freeze`

#### `merge`

```ts
merge<A, B>(a: A, b: B): A & B
merge(...sources, options?: { arrays?: "replace" | "concat" | "union" }): any
```

Recursive merge of plain objects. Arrays default to **replace**; pass an options object as the last argument to change strategy.

```ts
merge({ a: { b: 1 } }, { a: { c: 2 } });
// { a: { b: 1, c: 2 } }

merge({ list: [1, 2] }, { list: [3, 4] }, { arrays: "concat" });
// { list: [1, 2, 3, 4] }

merge({ list: [1, 2] }, { list: [2, 3] }, { arrays: "union" });
// { list: [1, 2, 3] }
```

Class instances are taken from the latest source rather than merged (cloning custom constructors is out of scope).

#### `clone`

```ts
clone<T>(value: T): T
```

Deep clone. Handles `Date`, `RegExp`, `Error` (with own props), `Map`, `Set`, typed arrays, `ArrayBuffer`, and **circular references** via internal `WeakMap`. Non-plain class instances are returned by reference.

```ts
const copy = clone({ user: { name: "Ada" }, tags: ["x"] });
copy.user.name = "Bob";
// original is untouched
```

#### `flatten`

```ts
flatten(obj: any, options?: {
  separator?: string;       // default "."
  keepNested?: boolean;     // default false
  maxDepth?: number;        // default Infinity
}): Record<string, any>
```

Flatten to a single-level map of dot-keyed paths. Descends into plain objects, arrays, and class instances. Treats `Date` / `RegExp` / `Map` / `Set` / typed arrays as leaves.

```ts
flatten({ a: { b: 1, c: [2, 3] } });
// { "a.b": 1, "a.c.0": 2, "a.c.1": 3 }

flatten({ a: { b: 1 } }, { separator: "/" });
// { "a/b": 1 }
```

#### `freeze`

```ts
freeze<T>(value: T): Readonly<T>
```

Recursive `Object.freeze` across plain objects and arrays.

```ts
const config = freeze({ api: { url: "..." } });
config.api.url = "x"; // throws in strict mode
```

## Defaults & inversion

#### `defaults`

```ts
defaults<T>(target: T, ...sources): T
```

Mutating: fills only **`undefined`** keys on `target` from each source, left to right.

```ts
defaults({ a: 1 }, { a: 2, b: 3 });   // { a: 1, b: 3 }
defaults({}, { a: 1 }, { a: 2 });     // { a: 1 }  (first source wins)
```

#### `invert`

```ts
invert<K, V>(obj: Record<K, V>): Record<string, K>
```

Swap keys and values; values are coerced to strings; duplicate values collide last-wins.

```ts
invert({ a: 1, b: 2 }); // { "1": "a", "2": "b" }
```

## Per-entry mapping

#### `mapValues` / `mapKeys`

```ts
mapValues<T, U>(obj: T, fn: (value, key, obj) => U): Record<keyof T & string, U>
mapKeys<T>(obj: T, fn: (key, value, obj) => string): Record<string, T[keyof T]>
```

```ts
mapValues({ a: 1, b: 2 }, v => v * 2);              // { a: 2, b: 4 }
mapKeys({ a: 1, b: 2 }, k => k.toUpperCase());      // { A: 1, B: 2 }
```

#### `map`

```ts
map<T, U>(obj: T, fn: (key, value, obj) => U): U[]
```

Map an object to an array.

```ts
map({ a: 1, b: 2 }, (k, v) => `${k}=${v}`); // ["a=1", "b=2"]
```

## Typed enumeration

```ts
keys<T>(obj: T): Array<keyof T & string>
values<T>(obj: T): Array<T[keyof T]>
entries<T>(obj: T): Array<[keyof T & string, T[keyof T]]>
fromEntries<K, V>(entries: Iterable<readonly [K, V]>): Record<K, V>
```

Typed wrappers around the matching `Object.*` static methods.

## Traversal & comparison

#### `walk`

```ts
walk(obj: any, visitor: (value, path, parent, key) => void, parentPath?: string): void
```

Recursive **leaf** traversal. Descends into plain objects and arrays; calls `visitor` for every non-container value with the full dot-path.

```ts
walk({ a: { b: 1, c: [2, 3] } }, (value, path) => log(path, value));
// "a.b" 1
// "a.c.0" 2
// "a.c.1" 3
```

#### `diff`

```ts
diff(a: object, b: object): {
  added: Record<string, any>;
  removed: Record<string, any>;
  changed: Record<string, { from: any; to: any }>;
}
```

Shallow structural diff; uses deep value equality (`areEqual`) for nested comparison.

```ts
diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
// { added: { c: 4 }, removed: {}, changed: { b: { from: 2, to: 3 } } }
```

## Sorting

#### `sort`

```ts
sort<T>(obj: T, recursive?: boolean): T  // default recursive = true
```

Return a new object with keys sorted alphabetically. Arrays of objects are out of scope — use `@mongez/collection` `sortBy`.

```ts
sort({ b: 1, a: 2, c: 3 });             // { a: 2, b: 1, c: 3 }
sort({ b: { y: 1, x: 2 }, a: 1 });      // recursive by default
```
