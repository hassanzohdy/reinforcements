---
name: mongez-reinforcements-arrays
description: |
  @mongez/reinforcements array helpers — chunking, ranges, unique/dedupe, pluck, groupBy, countBy, stats (sum/avg/median/min/max), even/odd parity filters, and mutating pushUnique/unshiftUnique. One function per section: description, signature, example.
---

# Arrays

Lightweight, tree-shakable array helpers. Every function imports from the package root — `import { unique } from "@mongez/reinforcements"`. For a chainable collection API and heavier operations (`sortBy`, `where`, `flatMap`, …) reach for [`@mongez/collection`](/collection/overview/).

## `chunk()`

Split an array (or string) into groups of `size`. The final group holds whatever is left over.

```ts
chunk<T>(array: T[] | string, size: number): T[][]
```

```ts
chunk([1, 2, 3, 4, 5], 2);  // [[1, 2], [3, 4], [5]]
chunk("abcdef", 2);         // [["a", "b"], ["c", "d"], ["e", "f"]]
```

## `range()`

Build an inclusive array of numbers from `min` to `max`.

```ts
range(min: number, max: number): number[]
```

```ts
range(1, 5);   // [1, 2, 3, 4, 5]
range(0, 0);   // [0]
```

## `unique()`

Remove duplicate values. Pass a `key` to dedupe an array of objects by a property — the result is the plucked unique values for that key.

```ts
unique<T>(array: T[], key?: string): T[]
```

```ts
unique([1, 1, 2, 3, 3]);                          // [1, 2, 3]
unique([{ id: 1 }, { id: 1 }, { id: 2 }], "id");  // [1, 2]
```

## `pluck()`

Project a single property (or a subset of properties) out of an array of objects. Dot-notation paths work for nested values.

```ts
pluck(array: any[], key?: string | string[]): any[]
```

```ts
pluck([{ name: "Ada" }, { name: "Bob" }], "name"); // ["Ada", "Bob"]
pluck([{ a: 1, b: 2 }, { a: 3, b: 4 }], ["a"]);    // [{ a: 1 }, { a: 3 }]
pluck(users, "address.city");                       // nested path
```

## `groupBy()`

Group an array of objects by one or more keys. Each group is an object with the key value(s) plus a `data` array of its members — rename `data` via the third argument.

```ts
groupBy(array: object[], key: string | string[], listAs?: string): object[]
```

```ts
groupBy(students, "class");             // [{ class: "A", data: [...] }, ...]
groupBy(students, ["class", "grade"]);  // multi-key grouping
groupBy(students, "class", "items");    // rename "data" → "items"
```

## `countBy()`

Tally how many items fall under each value of `key`. Returns a `value → count` map.

```ts
countBy(array: any[], key: string): Record<string, number>
```

```ts
countBy([{ type: "a" }, { type: "b" }, { type: "a" }], "type");
// { a: 2, b: 1 }
```

## `count()`

Count items matching a condition — either items with a defined value at a dot-notation path, or items passing a predicate.

```ts
count(array: any[], key: string | ((item) => boolean)): number
```

```ts
count(items, "name");               // items that have a defined "name"
count(items, item => item.active);  // items passing the predicate
```

## `sum()`

Add up the numbers in an array. Pass a dot-notation `key` to sum a property across an array of objects.

```ts
sum(array: any[], key?: string): number
```

```ts
sum([1, 2, 3]);             // 6
sum(orders, "total.price"); // sum of total.price across orders
```

## `average()` / `avg()`

Arithmetic mean of the values (or of a keyed property). `avg` is a shorthand alias.

```ts
average(array: any[], key?: string): number   // alias: avg
```

```ts
average([2, 4, 6]); // 4
avg(users, "age");  // mean age
```

> Average of an empty array is `NaN` — guard before displaying.

## `median()`

The middle value once sorted (mean of the two middle values for even-length arrays).

```ts
median(array: any[], key?: string): number
```

```ts
median([1, 2, 3, 4]); // 2.5
median([3, 1, 2]);    // 2
```

## `min()` / `max()`

Smallest / largest value, optionally by a dot-notation key.

```ts
min(array: any[], key?: string): number
max(array: any[], key?: string): number
```

```ts
min([5, 2, 9]);   // 2
max(users, "age"); // largest age
```

> `min` / `max` of an empty array return `0`.

## `even()` / `odd()`

Filter to elements whose **value** is even / odd. With a `key`, tests that property instead.

```ts
even(array: any[], key?: string): any[]
odd(array: any[], key?: string): any[]
```

```ts
even([1, 2, 3, 4]);  // [2, 4]
odd([1, 2, 3, 4]);   // [1, 3]
even(items, "age");  // items whose age is even
```

## `evenIndexes()` / `oddIndexes()`

Filter by **position** rather than value — elements sitting at even / odd indices.

```ts
evenIndexes<T>(array: T[]): T[]   // indices 0, 2, 4, …
oddIndexes<T>(array: T[]): T[]    // indices 1, 3, 5, …
```

```ts
evenIndexes(["a", "b", "c", "d"]); // ["a", "c"]
oddIndexes(["a", "b", "c", "d"]);  // ["b", "d"]
```

## `pushUnique()` / `unshiftUnique()`

Append / prepend items only when they aren't already present.

```ts
pushUnique<T>(array: T[], ...items: T[]): T[]
unshiftUnique<T>(array: T[], ...items: T[]): T[]
```

```ts
const arr = [1, 2];
pushUnique(arr, 2, 3);    // [1, 2, 3]    — 2 was skipped
unshiftUnique(arr, 0, 1); // [0, 1, 2, 3] — 1 was skipped
```

> **These mutate the input array** (and return the same reference). Reach for them when you have a stable array you want to grow without duplicates. For a non-mutating dedupe, use [`unique()`](#unique).

## `partition()`

Split an array into two groups by a predicate: `[pass, fail]`. Single pass, original order preserved.

```ts
partition<T>(array: T[], predicate: (item: T, index: number) => unknown): [T[], T[]]
```

```ts
partition([1, 2, 3, 4], n => n % 2 === 0);  // [[2, 4], [1, 3]]
const [active, archived] = partition(users, u => u.active);
```

## `keyBy()`

Index an array into an object keyed by each item's `key` — a dot-notation string path or a selector function. Last item wins on key collision.

```ts
keyBy<T>(array: T[], key: string | ((item: T, index: number) => PropertyKey)): Record<string, T>
```

```ts
keyBy([{ id: 1 }, { id: 2 }], "id"); // { "1": { id: 1 }, "2": { id: 2 } }
keyBy(users, user => user.email);    // keyed by email
```

## `intersection()`

Unique values present in **every** array (set intersection). Order follows the first array; values compared by `SameValueZero`.

```ts
intersection<T>(...arrays: T[][]): T[]
```

```ts
intersection([1, 2, 3], [2, 3, 4], [3, 2]); // [2, 3]
```

## `difference()`

Unique values from the first array that appear in **none** of the others (set difference). Order follows the first array.

```ts
difference<T>(array: T[], ...others: T[][]): T[]
```

```ts
difference([1, 2, 3, 4], [2, 4]); // [1, 3]
difference([1, 2, 3], [2], [3]);  // [1]
```

## `union()`

Concatenate all arrays and return the unique values, preserving first-seen order (set union).

```ts
union<T>(...arrays: T[][]): T[]
```

```ts
union([1, 2], [2, 3], [3, 4]); // [1, 2, 3, 4]
```

## `zip()`

Combine several arrays into tuples paired by index. Length matches the **longest** input; missing slots are `undefined`.

```ts
zip(...arrays: T[][]): Array<[...tuple]>
```

```ts
zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
zip([1], ["a", "b"]);    // [[1, "a"], [undefined, "b"]]
```

## `unzip()`

The inverse of `zip` — turn an array of tuples back into a tuple of arrays grouped by position.

```ts
unzip<T>(array: T[][]): (T | undefined)[][]
```

```ts
unzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]
```
