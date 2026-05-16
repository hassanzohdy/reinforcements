import isPlainObject from "./isPlainObject";

/**
 * Recursively freeze a plain object/array tree. `Object.freeze` is
 * shallow; this descends into plain objects and arrays.
 *
 * @example
 * const config = freeze({ api: { url: "..." } });
 *
 * config.api.url = "x"; // throws in strict mode
 */
export default function freeze<T>(value: T): Readonly<T> {
  if (!isPlainObject(value) && !Array.isArray(value)) {
    return value;
  }

  Object.freeze(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      freeze(item);
    }

    return value;
  }

  for (const key of Object.keys(value as object)) {
    freeze((value as any)[key]);
  }

  return value;
}
