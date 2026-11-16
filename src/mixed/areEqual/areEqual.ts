import { assertDepth } from "../../object/nesting";

type SeenMap = WeakMap<object, any>;

/**
 * Deep value equality. Compares plain objects, arrays, `Date`, `RegExp`,
 * `Map`, and `Set` structurally. Does not mutate its inputs and is safe
 * against circular references.
 *
 * Differs from reference equality (`===`) and from `@mongez/supportive-is`
 * predicates: this is a value comparator, not a type/shape check.
 *
 * @example
 * areEqual({ a: 1 }, { a: 1 }); // true
 * areEqual([1, 2], [1, 2]); // true
 * areEqual([1, 2], [2, 1]); // false — order matters
 * areEqual(new Date(0), new Date(0)); // true
 */
export default function areEqual(a: any, b: any): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (
    a === null ||
    b === null ||
    typeof a !== "object" ||
    typeof b !== "object"
  ) {
    return false;
  }

  // the `seen` map is only needed once we recurse into containers, so it is
  // allocated here and never for primitives or identical references
  // depth counts the containers on the current path, the root being 1
  return deepEqual(a, b, new WeakMap(), 1);
}

function deepEqual(a: any, b: any, seen: SeenMap, depth: number): boolean {
  if (Object.is(a, b)) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  if (seen.get(a) === b) {
    return true;
  }

  seen.set(a, b);

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  assertDepth(depth, "areEqual");

  if (Array.isArray(a)) {
    return Array.isArray(b) && equalArrays(a, b, seen, depth + 1);
  }

  if (Array.isArray(b)) {
    return false;
  }

  if (a instanceof Map) {
    return b instanceof Map && equalMaps(a, b, seen, depth + 1);
  }

  if (b instanceof Map) {
    return false;
  }

  if (a instanceof Set) {
    return b instanceof Set && equalSets(a, b);
  }

  if (b instanceof Set) {
    return false;
  }

  return equalObjects(a, b, seen, depth + 1);
}

function equalArrays(
  a: any[],
  b: any[],
  seen: SeenMap,
  depth: number,
): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!deepEqual(a[i], b[i], seen, depth)) {
      return false;
    }
  }

  return true;
}

function equalMaps(
  a: Map<any, any>,
  b: Map<any, any>,
  seen: SeenMap,
  depth: number,
): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const [key, value] of a) {
    if (!b.has(key)) {
      return false;
    }

    if (!deepEqual(value, b.get(key), seen, depth)) {
      return false;
    }
  }

  return true;
}

function equalSets(a: Set<any>, b: Set<any>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }

  return true;
}

function equalObjects(a: any, b: any, seen: SeenMap, depth: number): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if (!deepEqual(a[key], b[key], seen, depth)) {
      return false;
    }
  }

  return true;
}
