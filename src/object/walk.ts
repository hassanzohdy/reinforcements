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
  if (Array.isArray(object)) {
    walkArray(object, visitor, parentPath);

    return;
  }

  if (!isPlainObject(object)) {
    return;
  }

  walkObject(object, visitor, parentPath);
}

function walkArray(
  array: any[],
  visitor: WalkVisitor,
  parentPath: string,
): void {
  array.forEach((item, index) => {
    const path = parentPath ? `${parentPath}.${index}` : String(index);

    if (isPlainObject(item) || Array.isArray(item)) {
      walk(item, visitor, path);

      return;
    }

    visitor(item, path, array, index);
  });
}

function walkObject(
  object: Record<string, any>,
  visitor: WalkVisitor,
  parentPath: string,
): void {
  for (const key of Object.keys(object)) {
    const value = object[key];
    const path = parentPath ? `${parentPath}.${key}` : key;

    if (isPlainObject(value) || Array.isArray(value)) {
      walk(value, visitor, path);

      continue;
    }

    visitor(value, path, object, key);
  }
}
