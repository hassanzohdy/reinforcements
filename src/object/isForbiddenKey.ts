/**
 * Keys that would let a caller reach `Object.prototype` (or any other
 * prototype) and pollute every object in the runtime. Writing through
 * them is always rejected.
 *
 * `JSON.parse` produces `__proto__` as a plain own property, so any
 * helper that walks user-supplied data and assigns keys back onto an
 * object has to filter these out before writing.
 */
export const FORBIDDEN_KEYS = ["__proto__", "constructor", "prototype"];

/**
 * Internal helper: check whether `key` is a prototype-pollution vector
 * and must never be written to.
 *
 * Not exported from the package root — it guards the internals of
 * `set`, `merge` and `defaults`.
 */
export default function isForbiddenKey(key: string): boolean {
  return FORBIDDEN_KEYS.includes(key);
}
