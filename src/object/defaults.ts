import isForbiddenKey from "./isForbiddenKey";

/**
 * Assign properties from each source to `target`, but only for keys
 * that are currently `undefined` on `target`. Mutates and returns
 * `target`.
 *
 * Source keys named `__proto__`, `constructor` or `prototype` are never
 * copied — they are skipped so untrusted defaults cannot pollute
 * prototypes.
 *
 * @example
 * defaults({ a: 1 }, { a: 2, b: 3 }); // { a: 1, b: 3 }
 */
export default function defaults<T extends Record<string, any>>(
  target: T,
  ...sources: Array<Record<string, any> | null | undefined>
): T {
  if (!target || typeof target !== "object") {
    return target;
  }

  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }

    for (const key of Object.keys(source)) {
      // Skipped rather than rejected so the rest of the source still
      // applies. The `=== undefined` test below reads through the
      // prototype chain, which happens to hide `__proto__` on ordinary
      // objects — that is an accident, not a guard, so filter explicitly.
      if (isForbiddenKey(key)) {
        continue;
      }

      if ((target as any)[key] === undefined) {
        (target as any)[key] = source[key];
      }
    }
  }

  return target;
}
