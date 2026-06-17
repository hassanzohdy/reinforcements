/**
 * Conditionally produce an object for inline spreading. Returns `value`
 * (or the result of calling it) when `condition` is truthy, otherwise an
 * empty object. Designed to be spread into an object literal so a key is
 * only present when the condition holds.
 *
 * The value may be a factory function — it is invoked lazily, only when
 * `condition` is truthy, so the cost of building it is skipped otherwise.
 *
 * @example
 * const payload = {
 *   name: "Ada",
 *   ...when(isAdmin, { role: "admin" }),
 * };
 * // isAdmin === true  -> { name: "Ada", role: "admin" }
 * // isAdmin === false -> { name: "Ada" }
 *
 * @example
 * // Lazy value: buildHeavyConfig() runs only when `ready` is truthy.
 * when(ready, () => ({ config: buildHeavyConfig() }));
 */
export default function when<T extends object>(
  condition: unknown,
  value: T | (() => T),
): Partial<T> {
  if (!condition) {
    return {};
  }

  return typeof value === "function" ? (value as () => T)() : value;
}
