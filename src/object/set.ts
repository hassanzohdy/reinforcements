import isForbiddenKey from "./isForbiddenKey";

const NUMERIC_SEGMENT = /^\d+$/;

/**
 * Set `value` at `path` in `object`. Creates intermediate objects (or
 * arrays when the next segment is a numeric index) along the way.
 * Mutates and returns the input.
 *
 * Paths containing `__proto__`, `constructor` or `prototype` are
 * rejected — the object is returned untouched.
 *
 * @example
 * set({}, "a.b.c", 1); // { a: { b: { c: 1 } } }
 * set({}, "users.0.name", "Ada"); // { users: [{ name: "Ada" }] }
 * set({}, "__proto__.polluted", 1); // {} — rejected
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

    const nextSegmentIsIndex = NUMERIC_SEGMENT.test(segments[i + 1]);
    const needsContainer = current[key] === undefined || current[key] === null;

    if (needsContainer) {
      current[key] = nextSegmentIsIndex ? [] : {};
    }

    current = current[key];
  }

  return object;
}
