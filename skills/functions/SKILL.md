---
name: mongez-reinforcements-functions
description: |
  Function utilities from @mongez/reinforcements — debounce, throttle, memoize, once/after/before call-count gating, pipe/compose composition, curry/partial application, and FP primitives.
---
# Function utilities

Rate-limiting, memoization, composition, currying, tiny FP primitives.

```ts
import {
  debounce, throttle, memoize, once, after, before,
  pipe, compose, tap, curry, partial, partialRight,
  noop, identity, constant, negate, escapeRegex, attempt,
} from "@mongez/reinforcements";
```

## Rate-limiting

#### `debounce`

```ts
debounce<T>(fn: T, wait: number, options?: {
  leading?: boolean;   // default false
  trailing?: boolean;  // default true
  maxWait?: number;    // force invocation at this cap, even if input keeps coming
}): Debounced<T>

type Debounced<T> = T & {
  cancel(): void;   // drop any pending invocation
  flush(): void;    // invoke the pending call immediately
  pending(): boolean;
};
```

```ts
const save = debounce(payload => api.save(payload), 500, { maxWait: 3000 });

input.addEventListener("input", e => save(e.target.value));
button.addEventListener("click", () => save.flush());
window.addEventListener("beforeunload", () => save.cancel());
```

#### `throttle`

```ts
throttle<T>(fn: T, wait: number, options?: {
  leading?: boolean;   // default true
  trailing?: boolean;  // default true
}): Throttled<T>

type Throttled<T> = T & { cancel(): void; flush(): void; pending(): boolean };
```

```ts
const onScroll = throttle(() => layout(), 100);
window.addEventListener("scroll", onScroll);
```

## Caching

#### `memoize`

```ts
memoize<T>(fn: T, options?: {
  resolver?: (...args: Parameters<T>) => string; // default JSON.stringify(args)
  ttl?: number;                                  // ms; default Infinity
}): Memoized<T>

type Memoized<T> = T & { clear(): void; forget(key: string): void };
```

```ts
const lookup = memoize((id: string) => db.users.find(id), { ttl: 60_000 });

lookup("u1");                       // hits DB
lookup("u1");                       // cached
lookup.forget(JSON.stringify(["u1"])); // surgical invalidation (default key = JSON.stringify(args))
lookup.clear();                     // nuke everything
```

Custom key:

```ts
const cached = memoize(
  (a: User, b: User) => similarity(a, b),
  { resolver: (a, b) => `${a.id}-${b.id}` },
);
```

## Call-count gating

```ts
once<T>(fn: T): T                                   // run once, cache result forever
after<T>(n: number, fn: T): (...args) => R | undefined  // only invokes after N-th call
before<T>(n: number, fn: T): (...args) => R | undefined // up to N times; later calls return last result
```

```ts
const init = once(() => expensiveSetup());
init(); init(); init(); // expensiveSetup runs once

const onAllDone = after(3, () => render());
onAllDone(); onAllDone(); onAllDone(); // render() on the third call

const tryConnect = before(3, () => connect());
// up to 3 actual connect() calls; further calls return the last result
```

## Composition

#### `pipe` / `compose`

```ts
pipe<A>(value: A): A
pipe<A, B>(value: A, fn1: (a: A) => B): B
pipe<A, B, C>(value: A, fn1: (a: A) => B, fn2: (b: B) => C): C
// …up to 4 typed steps; variadic fallback after that

compose<A, B, C>(fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => C
// right-to-left
```

```ts
pipe(2, n => n + 1, n => n * 10);  // 30

const shout = compose(
  (s: string) => s + "!",
  (s: string) => s.toUpperCase(),
);
shout("hi");  // "HI!"
```

#### `tap` / `tap.with`

```ts
tap<T>(value: T, sideEffect: (value: T) => void): T
tap.with<T>(sideEffect: (value: T) => void): (value: T) => T
```

Side-effect probe. `tap.with` returns a pipeline-friendly identity-with-side-effect.

```ts
pipe(value, trim, tap.with(console.log), toSnakeCase);
```

## Currying & partial application

```ts
curry(fn: (...args) => R): any
partial<T>(fn: T, ...preset): (...rest) => ReturnType<T>
partialRight<T>(fn: T, ...preset): (...rest) => ReturnType<T>
```

```ts
const add = curry((a: number, b: number, c: number) => a + b + c);
add(1)(2)(3);       // 6
add(1, 2)(3);       // 6
add(1, 2, 3);       // 6

const greet = (greeting: string, name: string) => `${greeting}, ${name}`;
const hello = partial(greet, "Hello");
hello("Ada");       // "Hello, Ada"

const divide = (a: number, b: number) => a / b;
const halve = partialRight(divide, 2);
halve(10);          // 5
```

## Tiny FP primitives

```ts
noop(): void                                    // does nothing
identity<T>(value: T): T                        // returns argument
constant<T>(value: T): () => T                  // returns a function that always yields value
negate<T>(predicate: T): (...args) => boolean   // inverts a predicate
```

```ts
items.filter(identity);              // drop falsy values
events.on("data", noop);             // explicitly ignore
const always42 = constant(42);
const isOdd = negate((n: number) => n % 2 === 0);
```

## `escapeRegex`

```ts
escapeRegex(string: string): string
```

Escape regex meta-characters so a literal string can be used in a `RegExp`.

```ts
new RegExp(escapeRegex("a.b+c")); // matches the literal "a.b+c"
```

## `attempt`

```ts
attempt<T, F = undefined>(fn: () => Promise<T>, fallback?: F): Promise<T | F>
attempt<T, F = undefined>(fn: () => T, fallback?: F): T | F
```

Run `fn` and return its result; if it throws or rejects, return `fallback` (or `undefined`). Works for sync and async functions — a promise-returning `fn` yields a promise. Removes one-off try/catch boilerplate.

```ts
const config = attempt(() => JSON.parse(raw), {});
const user = await attempt(() => api.getUser(id), null);
```
