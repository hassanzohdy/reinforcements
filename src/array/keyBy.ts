import get from "../object/get";
import { GenericObject } from "../types";

/**
 * Index `array` into an object keyed by each item's `key`. `key` may be
 * a dot-notation string path or a selector function. When two items
 * resolve to the same key, the last one wins.
 *
 * @example
 * keyBy([{ id: 1 }, { id: 2 }], "id");
 * // { "1": { id: 1 }, "2": { id: 2 } }
 *
 * keyBy(users, user => user.email); // keyed by email
 */
export default function keyBy<T>(
  array: readonly T[],
  key: string | ((item: T, index: number) => PropertyKey),
): GenericObject<T> {
  const result: GenericObject<T> = {};

  if (!Array.isArray(array)) {
    return result;
  }

  const resolve =
    typeof key === "function" ? key : (item: T) => get(item as any, key);

  for (let i = 0; i < array.length; i++) {
    const resolved = resolve(array[i], i) as PropertyKey;

    result[resolved as string] = array[i];
  }

  return result;
}
