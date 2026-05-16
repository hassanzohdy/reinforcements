import unset from "./unset";

export type OmitPredicate = (value: any, key: string) => boolean;

/**
 * Build a shallow clone of `object` with the requested keys removed.
 * Keys support dot notation and may also be expressed as a predicate.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ["b"]); // { a: 1, c: 3 }
 * omit({ a: { b: 1, c: 2 } }, ["a.b"]); // { a: { c: 2 } }
 * omit({ a: 1, b: 2 }, (_, key) => key === "a"); // { b: 2 }
 */
export default function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K>;
export default function omit(
  object: Record<string, any>,
  keys: readonly string[],
): Record<string, any>;
export default function omit(
  object: Record<string, any>,
  predicate: OmitPredicate,
): Record<string, any>;
export default function omit(
  object: any,
  keysOrPredicate: readonly string[] | OmitPredicate,
): any {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return object;
  }

  if (typeof keysOrPredicate === "function") {
    return omitByPredicate(object, keysOrPredicate);
  }

  return unset({ ...object }, keysOrPredicate);
}

function omitByPredicate(
  object: Record<string, any>,
  predicate: OmitPredicate,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(object)) {
    if (!predicate(object[key], key)) {
      result[key] = object[key];
    }
  }

  return result;
}
