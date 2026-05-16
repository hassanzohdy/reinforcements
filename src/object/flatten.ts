export type FlattenOptions = {
  /** Separator between path segments. Default: `"."`. */
  separator?: string;
  /** Keep the original nested object/array alongside its flattened entries. Default: `false`. */
  keepNested?: boolean;
  /** Maximum recursion depth (`0` = no descent). Default: unlimited. */
  maxDepth?: number;
};

type WalkContext = {
  root: Record<string, any>;
  separator: string;
  keepNested: boolean;
  maxDepth: number;
};

/**
 * Flatten a nested object/array into a single-level object keyed by
 * dot-notation paths. Descends into plain objects, arrays, and class
 * instances; treats `Date`, `RegExp`, `Map`, `Set`, typed arrays, and
 * primitives as leaves.
 *
 * @example
 * flatten({ a: 1, b: { c: 2 } }); // { a: 1, "b.c": 2 }
 * flatten({ a: { b: 1 } }, { separator: "/" }); // { "a/b": 1 }
 */
export default function flatten(
  object: any,
  options: FlattenOptions = {},
): Record<string, any> {
  const context: WalkContext = {
    root: {},
    separator: options.separator ?? ".",
    keepNested: options.keepNested ?? false,
    maxDepth: options.maxDepth ?? Infinity,
  };

  walk(object, "", 0, context);

  return context.root;
}

function canDescend(value: any): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }

  if (value instanceof Date) return false;
  if (value instanceof RegExp) return false;
  if (value instanceof Map) return false;
  if (value instanceof Set) return false;
  if (value instanceof Error) return false;
  if (value instanceof ArrayBuffer) return false;
  if (ArrayBuffer.isView(value)) return false;

  return true;
}

function walk(
  value: any,
  parent: string,
  depth: number,
  context: WalkContext,
): void {
  if (!canDescend(value) || depth >= context.maxDepth) {
    if (parent) {
      context.root[parent] = value;
    }

    return;
  }

  const keys = Array.isArray(value)
    ? value.map((_, index) => String(index))
    : Object.keys(value);

  if (keys.length === 0) {
    if (parent) {
      context.root[parent] = value;
    }

    return;
  }

  for (const key of keys) {
    const child = value[key];
    const path = parent ? parent + context.separator + key : key;

    if (typeof child === "function") {
      context.root[path] = child;

      continue;
    }

    if (canDescend(child)) {
      const isEmptyArray = Array.isArray(child) && child.length === 0;

      if (isEmptyArray) {
        context.root[path] = child;

        continue;
      }

      if (context.keepNested) {
        context.root[path] = child;
      }

      walk(child, path, depth + 1, context);
    } else {
      context.root[path] = child;
    }
  }
}
