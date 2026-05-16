import get from "./get";
import set from "./set";

export type PickPredicate = (value: any, key: string) => boolean;

/**
 * Build a new object containing only the requested keys from
 * `object`. Keys support dot notation and may also be expressed as a
 * predicate.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ["a", "b"]); // { a: 1, b: 2 }
 * pick({ a: { b: 1, c: 2 } }, ["a.b"]); // { a: { b: 1 } }
 * pick({ a: 1, b: 2 }, value => value > 1); // { b: 2 }
 */
export default function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Pick<T, K>;
export default function pick(
  object: Record<string, any>,
  keys: readonly string[],
): Record<string, any>;
export default function pick(
  object: Record<string, any>,
  predicate: PickPredicate,
): Record<string, any>;
export default function pick(
  object: any,
  keysOrPredicate: readonly string[] | PickPredicate,
): any {
  if (!object || typeof object !== "object") {
    return {};
  }

  if (typeof keysOrPredicate === "function") {
    return pickByPredicate(object, keysOrPredicate);
  }

  return pickByKeys(object, keysOrPredicate);
}

function pickByPredicate(
  object: Record<string, any>,
  predicate: PickPredicate,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(object)) {
    if (predicate(object[key], key)) {
      result[key] = object[key];
    }
  }

  return result;
}

function pickByKeys(
  object: Record<string, any>,
  keys: readonly string[],
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of keys) {
    const value = get(object, key, undefined);

    if (value !== undefined) {
      set(result, key, value);
    }
  }

  return result;
}
