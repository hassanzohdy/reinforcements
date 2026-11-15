import { NestingGuard } from "./nesting";
import isPlainObject from "./isPlainObject";

/**
 * Recursively freeze a plain object/array tree. `Object.freeze` is
 * shallow; this descends into plain objects and arrays. Circular
 * references are safe — an object that is already part of the walk is
 * not visited twice. Trees nested deeper than 256 levels throw a
 * `NestingError`.
 *
 * @example
 * const config = freeze({ api: { url: "..." } });
 *
 * config.api.url = "x"; // throws in strict mode
 */
export default function freeze<T>(value: T): Readonly<T> {
  return freezeDeep(value, new NestingGuard("freeze"), new WeakSet());
}

function freezeDeep<T>(
  value: T,
  guard: NestingGuard,
  visited: WeakSet<object>,
): Readonly<T> {
  if (!isPlainObject(value) && !Array.isArray(value)) {
    return value;
  }

  // Already walked (a cycle or a shared reference).
  if (visited.has(value as object)) {
    return value;
  }

  visited.add(value as object);
  guard.enter(value as object);

  Object.freeze(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      freezeDeep(item, guard, visited);
    }
  } else {
    for (const key of Object.keys(value as object)) {
      freezeDeep((value as any)[key], guard, visited);
    }
  }

  guard.leave(value as object);

  return value;
}
