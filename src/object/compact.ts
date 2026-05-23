import isPlainObject from "./isPlainObject";

export type CompactOptions = {
  /**
   * Custom predicate; return `true` for values that should be dropped.
   * Default: drops `null`, `undefined`, and `""`.
   *
   * Note: `0`, `false`, and `NaN` are intentionally kept by the default
   * predicate — those are usually meaningful values.
   */
  predicate?: (value: any) => boolean;

  /** Drop empty arrays (`[]`) and empty objects (`{}`) after recursion. Default: `true`. */
  empties?: boolean;

  /** Recurse into nested arrays and plain objects. Default: `true`. */
  deep?: boolean;
};

const DEFAULT_PREDICATE = (value: any): boolean =>
  value === null || value === undefined || value === "";

function isEmptyContainer(value: any): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * Return a copy of `value` with "empty" entries stripped out. By default
 * this drops `null`, `undefined`, `""`, empty arrays, and empty objects;
 * recursion is enabled so deeply nested containers are cleaned too, and
 * containers that become empty after recursion are themselves dropped.
 *
 * Useful for cleaning API payloads, query parameters, and form data.
 *
 * @example
 * compact({ name: "Ada", email: "", phone: null, age: 0 });
 * // { name: "Ada", age: 0 }
 *
 * compact({ user: { name: "Ada", email: "" }, meta: {} });
 * // { user: { name: "Ada" } }
 *
 * compact(["a", "", null, "b"]);
 * // ["a", "b"]
 */
export default function compact<T extends Record<string, any>>(
  object: T,
  options?: CompactOptions,
): Partial<T>;
export default function compact<T>(array: T[], options?: CompactOptions): T[];
export default function compact(value: any, options?: CompactOptions): any;
export default function compact(
  value: any,
  options: CompactOptions = {},
): any {
  const predicate = options.predicate ?? DEFAULT_PREDICATE;
  const empties = options.empties ?? true;
  const deep = options.deep ?? true;

  return walk(value, predicate, empties, deep);
}

function walk(
  value: any,
  predicate: (value: any) => boolean,
  empties: boolean,
  deep: boolean,
): any {
  if (Array.isArray(value)) {
    return cleanArray(value, predicate, empties, deep);
  }

  if (isPlainObject(value)) {
    return cleanObject(value, predicate, empties, deep);
  }

  return value;
}

function cleanArray(
  array: any[],
  predicate: (value: any) => boolean,
  empties: boolean,
  deep: boolean,
): any[] {
  const result: any[] = [];

  for (const item of array) {
    let cleaned = item;

    if (deep && (Array.isArray(item) || isPlainObject(item))) {
      cleaned = walk(item, predicate, empties, deep);
    }

    if (predicate(cleaned)) {
      continue;
    }

    if (empties && isEmptyContainer(cleaned)) {
      continue;
    }

    result.push(cleaned);
  }

  return result;
}

function cleanObject(
  object: Record<string, any>,
  predicate: (value: any) => boolean,
  empties: boolean,
  deep: boolean,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key of Object.keys(object)) {
    let cleaned = object[key];

    if (deep && (Array.isArray(cleaned) || isPlainObject(cleaned))) {
      cleaned = walk(cleaned, predicate, empties, deep);
    }

    if (predicate(cleaned)) {
      continue;
    }

    if (empties && isEmptyContainer(cleaned)) {
      continue;
    }

    result[key] = cleaned;
  }

  return result;
}
