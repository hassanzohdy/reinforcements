export type GenericObject<T = any> = Record<string, T>;
export type AlphaNumeric = string | number;
export type Primitive = AlphaNumeric | boolean;

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;
export type Awaitable<T> = T | Promise<T>;
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Flatten an intersection type into a single object shape for nicer hover tooltips.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Convert a union to an intersection. Used for variadic `merge` typings.
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Nominal/branded type helper.
 *
 * @example
 * type UserId = Branded<string, "UserId">;
 */
export type Branded<T, B extends string> = T & { readonly __brand: B };

export type DeepPartial<T> = T extends Primitive | Date | RegExp | Function
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends Map<infer K, infer V>
        ? Map<K, DeepPartial<V>>
        : T extends Set<infer U>
          ? Set<DeepPartial<U>>
          : { [K in keyof T]?: DeepPartial<T[K]> };

export type DeepRequired<T> = T extends Primitive | Date | RegExp | Function
  ? T
  : T extends Array<infer U>
    ? Array<DeepRequired<U>>
    : { [K in keyof T]-?: DeepRequired<T[K]> };

export type DeepReadonly<T> = T extends Primitive | Date | RegExp | Function
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends Map<infer K, infer V>
      ? ReadonlyMap<K, DeepReadonly<V>>
      : T extends Set<infer U>
        ? ReadonlySet<DeepReadonly<U>>
        : { readonly [K in keyof T]: DeepReadonly<T[K]> };

export type DeepMutable<T> = T extends Primitive | Date | RegExp | Function
  ? T
  : T extends ReadonlyArray<infer U>
    ? Array<DeepMutable<U>>
    : { -readonly [K in keyof T]: DeepMutable<T[K]> };

/**
 * Dot-notation autocomplete for nested object paths.
 *
 * @example
 * type P = Path<{ a: { b: { c: number } } }>; // "a" | "a.b" | "a.b.c"
 */
export type Path<T, Depth extends number = 6> = [Depth] extends [0]
  ? never
  : T extends Primitive | Date | RegExp | Function
    ? never
    : T extends ReadonlyArray<infer U>
      ?
          | `${number}`
          | `${number}.${Path<U, Prev<Depth>> & (string | number)}`
      : {
          [K in keyof T & (string | number)]: T[K] extends
            | Primitive
            | Date
            | RegExp
            | Function
            | null
            | undefined
            ? `${K}`
            : `${K}` | `${K}.${Path<T[K], Prev<Depth>> & (string | number)}`;
        }[keyof T & (string | number)];

/**
 * Resolve the value type of a nested dot-notation path.
 */
export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : T extends ReadonlyArray<infer U>
      ? PathValue<U, Rest>
      : undefined
  : P extends keyof T
    ? T[P]
    : T extends ReadonlyArray<infer U>
      ? P extends `${number}`
        ? U
        : undefined
      : undefined;

type Prev<N extends number> = N extends 6
  ? 5
  : N extends 5
    ? 4
    : N extends 4
      ? 3
      : N extends 3
        ? 2
        : N extends 2
          ? 1
          : N extends 1
            ? 0
            : 0;
