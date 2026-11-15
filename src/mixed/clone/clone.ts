import { assertDepth } from "../../object/nesting";
import safeAssign from "../../object/safeAssign";

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

  // depth counts the containers on the current path, the root being 1
  return cloneDeep(value, new WeakMap(), 1) as T;
}

function cloneDeep(value: any, seen: SeenMap, depth: number): any {
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

  assertDepth(depth, "clone");

  if (value instanceof Error) {
    return cloneError(value, seen, depth + 1);
  }

  if (Array.isArray(value)) {
    return cloneArray(value, seen, depth + 1);
  }

  if (value instanceof Map) {
    return cloneMap(value, seen, depth + 1);
  }

  if (value instanceof Set) {
    return cloneSet(value, seen, depth + 1);
  }

  if (value instanceof DataView) {
    return cloneDataView(value);
  }

  if (ArrayBuffer.isView(value)) {
    return cloneTypedArray(value);
  }

  if (value instanceof ArrayBuffer) {
    return value.slice(0);
  }

  return clonePlainObject(value, seen, depth + 1);
}

function cloneRegExp(value: RegExp): RegExp {
  const copy = new RegExp(value.source, value.flags);

  copy.lastIndex = value.lastIndex;

  return copy;
}

function cloneError(value: Error, seen: SeenMap, depth: number): Error {
  const Ctor = value.constructor as ErrorConstructor;
  const copy = new Ctor(value.message);

  copy.stack = value.stack;
  copy.name = value.name;

  seen.set(value, copy);

  for (const key of Object.keys(value)) {
    safeAssign(copy, key, cloneDeep((value as any)[key], seen, depth));
  }

  return copy;
}

function cloneArray(value: any[], seen: SeenMap, depth: number): any[] {
  const copy: any[] = [];

  seen.set(value, copy);

  for (const item of value) {
    copy.push(cloneDeep(item, seen, depth));
  }

  return copy;
}

function cloneMap(
  value: Map<any, any>,
  seen: SeenMap,
  depth: number,
): Map<any, any> {
  const copy = new Map();

  seen.set(value, copy);

  for (const [key, val] of value) {
    copy.set(cloneDeep(key, seen, depth), cloneDeep(val, seen, depth));
  }

  return copy;
}

function cloneSet(value: Set<any>, seen: SeenMap, depth: number): Set<any> {
  const copy = new Set();

  seen.set(value, copy);

  for (const item of value) {
    copy.add(cloneDeep(item, seen, depth));
  }

  return copy;
}

// Copies only the bytes the view covers, not the whole underlying buffer.
function sliceViewBuffer(value: ArrayBufferView): ArrayBuffer {
  return (value.buffer as ArrayBuffer).slice(
    value.byteOffset,
    value.byteOffset + value.byteLength,
  );
}

function cloneTypedArray(value: ArrayBufferView): ArrayBufferView {
  const Ctor = value.constructor as new (
    buffer: ArrayBufferLike,
  ) => ArrayBufferView;

  return new Ctor(sliceViewBuffer(value));
}

function cloneDataView(value: DataView): DataView {
  return new DataView(sliceViewBuffer(value));
}

function clonePlainObject(value: object, seen: SeenMap, depth: number): object {
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
    safeAssign(copy, key, cloneDeep((value as any)[key], seen, depth));
  }

  return copy;
}
