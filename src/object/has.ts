/**
 * Check if `object` has a value at the given dot-notation `path`.
 * Returns `true` even when the resolved value is `undefined`, as long
 * as the property exists.
 *
 * @example
 * has({ a: { b: 1 } }, "a.b"); // true
 * has({ a: { b: undefined } }, "a.b"); // true
 * has({ a: {} }, "a.b"); // false
 */
export default function has(object: any, path: string): boolean {
  if (object === null || object === undefined) {
    return false;
  }

  if (!path) {
    return false;
  }

  const segments = path.split(".");

  let current: any = object;

  for (const key of segments) {
    if (current === null || current === undefined) {
      return false;
    }

    if (typeof current !== "object") {
      return false;
    }

    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      return false;
    }

    current = current[key];
  }

  return true;
}
