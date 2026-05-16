type SeenMap = WeakMap<object, any>;

/**
 * Deep-clone a value. Supports plain objects, arrays, `Date`, `RegExp`,
 * `Map`, `Set`, `Error`, and typed arrays. Handles circular references
 * via an internal `WeakMap`.
 *
 * Non-plain class instances are returned by reference — cloning custom
 * constructors requires the class's own copy logic, so this function
 * stops at that boundary rather than silently producing a half-clone.
 *
 * @example
 * const original = { user: { name: "Ada" }, tags: ["x"] };
 * const copy = clone(original);
 *
 * copy.user.name = "Bob";
 * original.user.name; // "Ada"
 */
export default function clone<T>(value: T): T {
  if (value === null || typeof value !== "object") {
    return value;
  }

  return cloneDeep(value, new WeakMap()) as T;
}

function cloneDeep(value: any, seen: SeenMap): any {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return cloneRegExp(value);
  }

  if (value instanceof Error) {
    return cloneError(value, seen);
  }

  if (Array.isArray(value)) {
    return cloneArray(value, seen);
  }

  if (value instanceof Map) {
    return cloneMap(value, seen);
  }

  if (value instanceof Set) {
    return cloneSet(value, seen);
  }

  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    return cloneTypedArray(value);
  }

  if (value instanceof ArrayBuffer) {
    return value.slice(0);
  }

  return clonePlainObject(value, seen);
}

function cloneRegExp(value: RegExp): RegExp {
  const copy = new RegExp(value.source, value.flags);

  copy.lastIndex = value.lastIndex;

  return copy;
}

function cloneError(value: Error, seen: SeenMap): Error {
  const Ctor = value.constructor as ErrorConstructor;
  const copy = new Ctor(value.message);

  copy.stack = value.stack;
  copy.name = value.name;

  seen.set(value, copy);

  for (const key of Object.keys(value)) {
    (copy as any)[key] = cloneDeep((value as any)[key], seen);
  }

  return copy;
}

function cloneArray(value: any[], seen: SeenMap): any[] {
  const copy: any[] = [];

  seen.set(value, copy);

  for (const item of value) {
    copy.push(cloneDeep(item, seen));
  }

  return copy;
}

function cloneMap(value: Map<any, any>, seen: SeenMap): Map<any, any> {
  const copy = new Map();

  seen.set(value, copy);

  for (const [key, val] of value) {
    copy.set(cloneDeep(key, seen), cloneDeep(val, seen));
  }

  return copy;
}

function cloneSet(value: Set<any>, seen: SeenMap): Set<any> {
  const copy = new Set();

  seen.set(value, copy);

  for (const item of value) {
    copy.add(cloneDeep(item, seen));
  }

  return copy;
}

function cloneTypedArray(value: ArrayBufferView): ArrayBufferView {
  const Ctor = value.constructor as new (
    buffer: ArrayBufferLike,
  ) => ArrayBufferView;

  return new Ctor((value.buffer as ArrayBuffer).slice(0));
}

function clonePlainObject(value: object, seen: SeenMap): object {
  const proto = Object.getPrototypeOf(value);
  const isPlain = proto === Object.prototype || proto === null;

  // Non-plain class instances are returned by reference. The user's class
  // owns its own copy semantics; we don't synthesize a half-broken instance.
  if (!isPlain) {
    return value;
  }

  const copy: any = Object.create(proto);

  seen.set(value, copy);

  for (const key of Object.keys(value)) {
    copy[key] = cloneDeep((value as any)[key], seen);
  }

  return copy;
}
