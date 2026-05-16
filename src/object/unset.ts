import get from "./get";

/**
 * Remove one or more dot-notation paths from `object`. Mutates and
 * returns the input.
 *
 * @example
 * unset({ a: 1, b: 2 }, ["a"]); // { b: 2 }
 * unset({ a: { b: 1, c: 2 } }, ["a.b"]); // { a: { c: 2 } }
 */
export default function unset<T extends Record<string, any>>(
  object: T,
  keys: readonly string[],
): T {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return object;
  }

  for (const key of keys) {
    deletePath(object, key);
  }

  return object;
}

function deletePath(object: any, path: string): void {
  const segments = path.split(".");

  if (segments.length === 1) {
    delete object[path];

    return;
  }

  const lastKey = segments.pop() as string;
  const parent = get(object, segments.join("."));

  if (parent && typeof parent === "object") {
    delete parent[lastKey];
  }
}
