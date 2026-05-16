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
  return deepEqual(a, b, new WeakMap());
}

function deepEqual(a: any, b: any, seen: SeenMap): boolean {
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

  if (Array.isArray(a)) {
    return Array.isArray(b) && equalArrays(a, b, seen);
  }

  if (Array.isArray(b)) {
    return false;
  }

  if (a instanceof Map) {
    return b instanceof Map && equalMaps(a, b, seen);
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

  return equalObjects(a, b, seen);
}

function equalArrays(a: any[], b: any[], seen: SeenMap): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!deepEqual(a[i], b[i], seen)) {
      return false;
    }
  }

  return true;
}

function equalMaps(
  a: Map<any, any>,
  b: Map<any, any>,
  seen: SeenMap,
): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const [key, value] of a) {
    if (!b.has(key)) {
      return false;
    }

    if (!deepEqual(value, b.get(key), seen)) {
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

function equalObjects(a: any, b: any, seen: SeenMap): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    if (!deepEqual(a[key], b[key], seen)) {
      return false;
    }
  }

  return true;
}
