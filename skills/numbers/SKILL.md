---
name: mongez-reinforcements-numbers
description: |
  Number utilities from @mongez/reinforcements — rounding, clamping, range helpers, safe arithmetic (safeDivide, percentage, parseNumber), and formatting (formatBytes, formatNumber).
---
# Numbers

Rounding, clamping, formatting, safe arithmetic. Import from `@mongez/reinforcements`.

## Rounding with precision

```ts
round(value: number, precision?: number): number  // default 2; rounds half-up
floor(value: number, precision?: number): number  // default 0
ceil(value: number, precision?: number): number   // default 0
toFixed(value: number, precision?: number): number  // returns number, not string
```

```ts
round(1.235, 2);   // 1.24
round(1.5, 0);     // 2     (true rounding, not floor)
floor(1.99, 1);    // 1.9
ceil(1.01, 1);     // 1.1
toFixed(1.236, 2); // 1.24  (number, not "1.24")
```

## Range helpers

```ts
clamp(value: number, min: number, max: number): number
inRange(value: number, min: number, max: number, options?: { inclusive?: boolean }): boolean
lerp(a: number, b: number, t: number): number
```

`clamp` normalizes swapped bounds. `inRange` defaults to `inclusive: true`.

```ts
clamp(15, 0, 10);                          // 10
clamp(-3, 0, 10);                          // 0
inRange(5, 0, 10);                         // true
inRange(10, 0, 10, { inclusive: false });  // false
lerp(0, 100, 0.25);                        // 25
```

## Safe arithmetic

#### `safeDivide`

```ts
safeDivide<F = number>(a: number, b: number, fallback?: F): number | F
```

Returns `fallback` (default `0`) when `b === 0` or the result isn't finite.

```ts
safeDivide(10, 2);          // 5
safeDivide(10, 0);          // 0
safeDivide(10, 0, null);    // null
```

#### `percentage`

```ts
percentage(value: number, total: number, decimals?: number): number  // default 2
```

```ts
percentage(25, 200);   // 12.5
percentage(7, 9, 1);   // 77.8
percentage(1, 0);      // 0   (safe on divide-by-zero)
```

#### `parseNumber`

```ts
parseNumber<F = number>(value: unknown, fallback?: F): number | F
```

Returns `fallback` (default `0`) for `null` / `undefined` / `""` / non-numeric input.

```ts
parseNumber("42");        // 42
parseNumber("abc", -1);   // -1
parseNumber(null, 0);     // 0
```

## Formatting

#### `formatBytes`

```ts
formatBytes(bytes: number, options?: {
  decimals?: number;   // default 2
  binary?: boolean;    // default false (use 1000-based units)
}): string
```

```ts
formatBytes(1500);                          // "1.50 KB"
formatBytes(1024, { binary: true, decimals: 0 }); // "1 KiB"
formatBytes(-1500, { decimals: 0 });        // "-2 KB"
formatBytes(0);                             // "0 B"
```

#### `formatNumber`

```ts
formatNumber(value: number, options?: Intl.NumberFormatOptions & {
  locale?: string | string[];
}): string
```

Thin wrapper around `Intl.NumberFormat`.

```ts
formatNumber(1234.5);                                     // "1,234.5"
formatNumber(0.42, { style: "percent" });                 // "42%"
formatNumber(99, { style: "currency", currency: "USD" }); // "$99.00"
formatNumber(1234, { locale: "ar-EG" });                  // "١٬٢٣٤"
```

#### `formatDuration`

```ts
formatDuration(ms: number, options?: {
  units?: number;      // max unit parts, largest-first; default Infinity
  long?: boolean;      // "1 hour 2 minutes" vs "1h 2m"; default false
  separator?: string;  // default " "
}): string
```

Human-readable duration from milliseconds (days → ms). Shows every non-zero unit by default; cap with `units`.

```ts
formatDuration(3661000);                // "1h 1m 1s"
formatDuration(3661000, { units: 2 });  // "1h 1m"
formatDuration(90000, { long: true });  // "1 minute 30 seconds"
```

#### `ordinal`

```ts
ordinal(value: number, options?: { withNumber?: boolean }): string  // withNumber default true
```

English ordinal for an integer; handles the 11–13 exception and negatives. The fraction is truncated.

```ts
ordinal(1);   // "1st"
ordinal(22);  // "22nd"
ordinal(113); // "113th"
ordinal(2, { withNumber: false }); // "nd"
```
