import { NestingGuard } from "./nesting";
import isPlainObject from "./isPlainObject";

export type WalkVisitor = (
  value: any,
  path: string,
  parent: any,
  key: string | number,
) => void;

/**
 * Recursively visit every leaf value in `object`. Nested plain
 * objects and arrays are descended; everything else is treated as a
 * leaf.
 *
 * @example
 * walk({ a: { b: 1 } }, (value, path) => console.log(path, value));
 * // logs:
 * //   "a.b" 1
 */
export default function walk(
  object: any,
  visitor: WalkVisitor,
  parentPath = "",
): void {
  walkValue(object, visitor, parentPath, new NestingGuard("walk"));
}

function walkValue(
  object: any,
  visitor: WalkVisitor,
  parentPath: string,
  guard: NestingGuard,
): void {
  if (Array.isArray(object)) {
    guard.enter(object);
    walkArray(object, visitor, parentPath, guard);
    guard.leave(object);

    return;
  }

  if (!isPlainObject(object)) {
    return;
  }

  guard.enter(object);
  walkObject(object, visitor, parentPath, guard);
  guard.leave(object);
}

function walkArray(
  array: any[],
  visitor: WalkVisitor,
  parentPath: string,
  guard: NestingGuard,
): void {
  array.forEach((item, index) => {
    const path = parentPath ? `${parentPath}.${index}` : String(index);

    if (isPlainObject(item) || Array.isArray(item)) {
      walkValue(item, visitor, path, guard);

      return;
    }

    visitor(item, path, array, index);
  });
}

function walkObject(
  object: Record<string, any>,
  visitor: WalkVisitor,
  parentPath: string,
  guard: NestingGuard,
): void {
  for (const key of Object.keys(object)) {
    const value = object[key];
    const path = parentPath ? `${parentPath}.${key}` : key;

    if (isPlainObject(value) || Array.isArray(value)) {
      walkValue(value, visitor, path, guard);

      continue;
    }

    visitor(value, path, object, key);
  }
}
