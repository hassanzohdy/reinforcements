---
name: mongez-reinforcements-types
description: |
  TypeScript-only utility types from @mongez/reinforcements — Path/PathValue for dot-notation typing, DeepPartial/DeepRequired/DeepReadonly/DeepMutable transforms, Prettify, UnionToIntersection, Branded nominal types, and common aliases.
---
# Types

TypeScript-only exports — zero runtime cost. Import as types:

```ts
import type {
  Path, PathValue,
  DeepPartial, DeepRequired, DeepReadonly, DeepMutable,
  Prettify, UnionToIntersection, Branded,
  Nullable, Maybe, Awaitable, NonEmptyArray,
  GenericObject, AlphaNumeric, Primitive,
} from "@mongez/reinforcements";
```

## Dot-notation paths

```ts
type Path<T, Depth = 6>          // union of every legal dot-notation path
type PathValue<T, P extends string> // resolved value type at path P
```

```ts
type User = {
  id: number;
  profile: { email: string; addresses: { city: string }[] };
};

type UserPath = Path<User>;
// "id" | "profile" | "profile.email" | "profile.addresses" | "profile.addresses.${number}" | ...

type Email = PathValue<User, "profile.email">; // string
type City  = PathValue<User, "profile.addresses.0.city">; // string
```

Used internally to type `get(obj, path)` overloads.

## Recursive transforms

```ts
type DeepPartial<T>    // all properties (recursively) optional
type DeepRequired<T>   // all properties (recursively) required
type DeepReadonly<T>   // all properties (recursively) readonly
type DeepMutable<T>    // strips readonly recursively
```

Each preserves primitives, `Date`, `RegExp`, `Function`, `Map<K,V>`, and `Set<T>` rather than recursing into them.

```ts
type Config = { api: { url: string; retries: number } };

type DraftConfig = DeepPartial<Config>;
// { api?: { url?: string; retries?: number } }

type FrozenConfig = DeepReadonly<Config>;
// { readonly api: { readonly url: string; readonly retries: number } }
```

## Display & combinators

```ts
type Prettify<T>            // flatten intersections in hover tooltips
type UnionToIntersection<U> // U union → I intersection (variadic typings)
```

```ts
type Combined = Prettify<{ a: 1 } & { b: 2 }>;
// hovers as { a: 1; b: 2 }  instead of  { a: 1 } & { b: 2 }
```

## Nominal types

```ts
type Branded<T, B extends string> = T & { readonly __brand: B }
```

Distinguish lookalike primitives at the type level.

```ts
type UserId = Branded<string, "UserId">;
type Email  = Branded<string, "Email">;

declare function getUser(id: UserId): User;

const id = "abc" as UserId;
getUser(id);            // ok
getUser("abc");         // ❌ TS error — string is not assignable to UserId
```

## Common aliases

```ts
type Nullable<T>        = T | null
type Maybe<T>           = T | null | undefined
type Awaitable<T>       = T | Promise<T>
type NonEmptyArray<T>   = [T, ...T[]]
type GenericObject<T=any> = Record<string, T>
type AlphaNumeric       = string | number
type Primitive          = AlphaNumeric | boolean
```

```ts
function init(input: Awaitable<Config>): Promise<void> { ... }

function first<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // safe, no `| undefined`
}
```
