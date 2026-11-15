import areEqual from "../mixed/areEqual/areEqual";
import isPlainObject from "./isPlainObject";
import safeAssign from "./safeAssign";

const hasOwn = Object.prototype.hasOwnProperty;

export type DiffResult = {
  added: Record<string, any>;
  removed: Record<string, any>;
  changed: Record<string, { from: any; to: any }>;
};

/**
 * Compute a shallow structural diff between two objects. Nested
 * objects are compared by deep equality; differing branches are
 * reported as a single `changed` entry on the top-level key.
 *
 * @example
 * diff({ a: 1, b: 2 }, { a: 1, b: 3, c: 4 });
 * // {
 * //   added:   { c: 4 },
 * //   removed: {},
 * //   changed: { b: { from: 2, to: 3 } },
 * // }
 */
export default function diff(
  a: Record<string, any>,
  b: Record<string, any>,
): DiffResult {
  const result: DiffResult = { added: {}, removed: {}, changed: {} };

  if (!isPlainObject(a) || !isPlainObject(b)) {
    return result;
  }

  for (const key of Object.keys(a)) {
    if (!hasOwn.call(b, key)) {
      safeAssign(result.removed, key, a[key]);

      continue;
    }

    if (!areEqual(a[key], b[key])) {
      safeAssign(result.changed, key, { from: a[key], to: b[key] });
    }
  }

  for (const key of Object.keys(b)) {
    if (!hasOwn.call(a, key)) {
      safeAssign(result.added, key, b[key]);
    }
  }

  return result;
}
