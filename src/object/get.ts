import type { Path, PathValue } from "../types";

/**
 * Get the value at `path` in `object`, returning `defaultValue` (or
 * `undefined`) if any segment along the path is missing.
 *
 * Path supports dot notation and array indices: `"users.0.address.city"`.
 *
 * @example
 * get({ a: { b: { c: 1 } } }, "a.b.c"); // 1
 * get({ a: { b: { c: 1 } } }, "a.b.x", "fallback"); // "fallback"
 */
export default function get<T, P extends Path<T> & string>(
  object: T,
  path: P,
  defaultValue?: PathValue<T, P>,
): PathValue<T, P>;
export default function get<T = any>(
  object: any,
  path: string,
  defaultValue?: T,
): T;
export default function get(
  object: any,
  path: string,
  defaultValue?: any,
): any {
  if (object === null || object === undefined) {
    return defaultValue;
  }

  if (path === "") {
    return defaultValue;
  }

  const segments = path.split(".");

  let current: any = object;

  for (const key of segments) {
    if (current === null || current === undefined) {
      return defaultValue;
    }

    if (typeof current !== "object") {
      return defaultValue;
    }

    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      return defaultValue;
    }

    current = current[key];
  }

  return current === undefined ? defaultValue : current;
}
