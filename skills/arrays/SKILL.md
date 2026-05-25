---
name: mongez-reinforcements-arrays
description: Lightweight array helpers from @mongez/reinforcements — chunking, range, unique, pluck, groupBy, stats (sum/average/median/min/max), parity filters, and mutating unique push/unshift.
when_to_use: User calls chunk(), range(), unique(), pluck(), groupBy(), countBy(), sum(), average(), median(), min(), max(), even(), odd(), pushUnique(), or unshiftUnique() from @mongez/reinforcements, or is working with array reshaping and aggregation.
---
# Arrays

Lightweight array helpers. For richer collection operations (`partition`, `keyBy`, `sortBy`, `intersection`, …), use **`@mongez/collections`**.

```ts
import {
  chunk, range, unique, pluck, groupBy, countBy, count,
  sum, average, avg, median, min, max,
  even, odd, evenIndexes, oddIndexes,
  pushUnique, unshiftUnique,
} from "@mongez/reinforcements";
```

## Reshaping

```ts
chunk<T>(array: T[] | string, size: number): T[][]
range(min: number, max: number): number[]
unique<T>(array: T[], key?: string): T[]
```

```ts
chunk([1, 2, 3, 4, 5], 2);  // [[1, 2], [3, 4], [5]]
chunk("abcdef", 2);          // [["a","b"], ["c","d"], ["e","f"]]
range(1, 5);                 // [1, 2, 3, 4, 5]
unique([1, 1, 2, 3, 3]);     // [1, 2, 3]
unique([{ id: 1 }, { id: 1 }, { id: 2 }], "id"); // [1, 2] — plucked
```

## Plucking / projection

```ts
pluck(array: any[], key?: string | string[]): any[]
```

```ts
pluck([{ name: "Ada" }, { name: "Bob" }], "name"); // ["Ada", "Bob"]
pluck([{ a: 1, b: 2 }, { a: 3, b: 4 }], ["a"]);    // [{ a: 1 }, { a: 3 }]
```

Dot-notation paths work: `pluck(users, "address.city")`.

## Grouping & counting

```ts
groupBy(array: object[], key: string | string[], listAs?: string): object[]
countBy(array: any[], key: string): Record<string, number>
count(array: any[], key: string | ((item) => boolean)): number
```

```ts
groupBy(students, "class");                  // [{ class: "A", data: [...] }, ...]
groupBy(students, ["class", "grade"]);       // multi-key grouping
groupBy(students, "class", "items");         // rename "data" → "items"

countBy([{ type: "a" }, { type: "b" }, { type: "a" }], "type");
// { a: 2, b: 1 }

count(items, "name");                  // count items with a defined "name" path
count(items, item => item.active);     // count by predicate
```

## Stats

```ts
sum(array: any[], key?: string): number
average(array: any[], key?: string): number   // alias: avg
median(array: any[], key?: string): number
min(array: any[], key?: string): number
max(array: any[], key?: string): number
```

All accept an optional dot-notation key for arrays of objects.

```ts
sum([1, 2, 3]);                                  // 6
sum(orders, "total.price");                       // sum of total.price across orders
average([2, 4, 6]);                               // 4
median([1, 2, 3, 4]);                             // 2.5
min(users, "age");                                // smallest age
max(users, "age");                                // largest age
```

## Parity filters

```ts
even(array: any[], key?: string): any[]
odd(array: any[], key?: string): any[]
evenIndexes<T>(array: T[]): T[]   // elements at indices 0, 2, 4, …
oddIndexes<T>(array: T[]): T[]    // elements at indices 1, 3, 5, …
```

```ts
even([1, 2, 3, 4]);                  // [2, 4]
odd([1, 2, 3, 4]);                   // [1, 3]
even(items, "age");                   // items whose age is even
evenIndexes(["a", "b", "c", "d"]);   // ["a", "c"]
oddIndexes(["a", "b", "c", "d"]);    // ["b", "d"]
```

## Mutating uniques

```ts
pushUnique<T>(array: T[], ...items: T[]): T[]      // push only if not already present
unshiftUnique<T>(array: T[], ...items: T[]): T[]   // unshift only if not already present
```

```ts
const arr = [1, 2];
pushUnique(arr, 2, 3);    // [1, 2, 3]   — 2 was skipped
unshiftUnique(arr, 0, 1); // [0, 1, 2, 3] — 1 was skipped
```

> These mutate the input array (they return the same reference). Use them when you have a stable array reference you want to grow without dupes.
