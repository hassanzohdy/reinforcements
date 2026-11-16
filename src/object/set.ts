import isForbiddenKey from "./isForbiddenKey";

const NUMERIC_SEGMENT = /^\d+$/;
const hasOwn = Object.prototype.hasOwnProperty;

/**
 * Largest numeric segment that makes `set` create an array container. A
 * larger index (for example `a.4294967294`) would build a sparse array
 * whose `length` costs O(index) to walk, so a plain object is created
 * instead. Existing arrays are never touched by this limit.
 */
export const MAX_SET_ARRAY_INDEX = 10_000;

function createsArray(nextSegment: string): boolean {
  return (
    NUMERIC_SEGMENT.test(nextSegment) && Number(nextSegment) <= MAX_SET_ARRAY_INDEX
  );
}

/**
 * Set `value` at `path` in `object`. Creates intermediate objects (or
 * arrays when the next segment is a numeric index) along the way.
 * Mutates and returns the input.
 *
 * Paths containing `__proto__`, `constructor` or `prototype` are
 * rejected — the object is returned untouched. A new container becomes
 * an array only when the next numeric segment is at most 10,000
 * (`MAX_SET_ARRAY_INDEX`); a larger index creates a plain object, so an
 * untrusted path cannot build a huge sparse array. Existing arrays are
 * written as they are. Only own members are
 * descended into, and a path that would descend into a primitive or a
 * function is also rejected (the object is returned untouched).
 *
 * @example
 * set({}, "a.b.c", 1); // { a: { b: { c: 1 } } }
 * set({}, "users.0.name", "Ada"); // { users: [{ name: "Ada" }] }
 * set({}, "__proto__.polluted", 1); // {} — rejected
 * set({}, "a.4294967294", "x"); // { a: { "4294967294": "x" } } — not an array
 */
export default function set<T extends Record<string, any>>(
  object: T,
  path: string,
  value: unknown,
): T {
  if (!object || typeof object !== "object") {
    return object;
  }

  if (!path) {
    return object;
  }

  const segments = path.split(".");
  const lastIndex = segments.length - 1;

  // Validated before any write so a rejected path never leaves behind
  // half-created containers.
  if (segments.some(isForbiddenKey)) {
    return object;
  }

  let current: any = object;

  for (let i = 0; i < segments.length; i++) {
    const key = segments[i];

    if (i === lastIndex) {
      current[key] = value;

      return object;
    }

    // Only OWN members are descended into: an inherited member such as
    // `toString` or `push` is treated as missing, so a path can never
    // reach a shared prototype or built-in function.
    const existing = hasOwn.call(current, key) ? current[key] : undefined;

    if (existing === undefined || existing === null) {
      current[key] = createsArray(segments[i + 1]) ? [] : {};
    } else if (typeof existing !== "object") {
      // A primitive or a function cannot hold children.
      return object;
    }

    current = current[key];
  }

  return object;
}
