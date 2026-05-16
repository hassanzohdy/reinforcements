/**
 * Return the first argument that is neither `null` nor `undefined`.
 * Returns `undefined` if every argument is nullish.
 *
 * @example
 * coalesce(null, undefined, "first", "second"); // "first"
 * coalesce(0, ""); // 0  (zero is not nullish)
 */
export default function coalesce<T>(
  ...values: Array<T | null | undefined>
): T | undefined {
  for (const value of values) {
    if (value !== null && value !== undefined) {
      return value;
    }
  }

  return undefined;
}
