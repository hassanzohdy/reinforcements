/**
 * Internal helper: check whether `value` is a plain `{}` object
 * literal (created via `{}`, `new Object()` or `Object.create(null)`).
 *
 * Not exported from the package root — `@mongez/supportive-is` owns
 * the public predicate surface. Used here only for internal
 * type-narrowing.
 */
export default function isPlainObject(
  value: unknown,
): value is Record<string, any> {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === null || proto === Object.prototype;
}
