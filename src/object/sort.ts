import { NestingGuard } from "./nesting";
import isPlainObject from "./isPlainObject";
import safeAssign from "./safeAssign";

/**
 * Return a new object with keys sorted alphabetically. When
 * `recursive` is `true` (default), nested plain objects are sorted as
 * well. Arrays are returned as-is.
 *
 * For sorting arrays of objects by key, use `sortBy` from
 * `@mongez/collections`.
 *
 * @example
 * sort({ b: 1, a: 2 }); // { a: 2, b: 1 }
 */
export default function sort<T>(object: T, recursive = true): T {
  return sortObject(object, recursive, new NestingGuard("sort"));
}

function sortObject<T>(object: T, recursive: boolean, guard: NestingGuard): T {
  if (!isPlainObject(object)) {
    return object;
  }

  guard.enter(object);

  const sortedObject: Record<string, any> = {};
  const sortedKeys = Object.keys(object as object).sort();

  for (const key of sortedKeys) {
    const value = (object as any)[key];

    safeAssign(
      sortedObject,
      key,
      recursive ? sortObject(value, true, guard) : value,
    );
  }

  guard.leave(object);

  return sortedObject as T;
}
