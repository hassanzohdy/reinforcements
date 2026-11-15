/**
 * Internal helper: write `value` onto `target[key]` as an own, ordinary
 * data property — even when `key` is `"__proto__"`.
 *
 * A plain `target[key] = value` with `key === "__proto__"` runs the
 * `Object.prototype.__proto__` setter and swaps the prototype of
 * `target`. `JSON.parse` hands `"__proto__"` over as an own key, so every
 * helper that rebuilds an object from user-supplied data must write
 * through this function to keep it an own key (like `{ ...object }`
 * does) instead.
 *
 * Not exported from the package root.
 */
export default function safeAssign(
  target: object,
  key: PropertyKey,
  value: unknown,
): void {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}
