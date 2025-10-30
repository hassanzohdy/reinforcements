
export default function clone<T>(value: T): T {
  if (!value) return value;
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return value.map(item => clone(item)) as any;
    } else if (value instanceof Date) {
      return new Date(value.getTime()) as any;
    } else if (value instanceof Set) {
      return new Set(Array.from(value, clone)) as any;
    } else if (value instanceof Map) {
      return new Map(
        Array.from(value, ([key, val]) => [key, clone(val)]),
      ) as any;
    } else if (typeof value === "object") {
      const proto = Object.getPrototypeOf(value);
      const isPlainObject = proto === Object.prototype || proto === null;

      if (!isPlainObject) {
        return value as T; // skip cloning non-plain objects
      }

      const cloned: any = Object.create(proto);
      for (const prop in value) {
        if (Object.prototype.hasOwnProperty.call(value, prop)) {
          cloned[prop] = clone((value as any)[prop]);
        }
      }
      return cloned as T;
    }
  } else {
    return value;
  }
  return value;
}
