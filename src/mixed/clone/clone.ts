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
    } else {
      const cloned: any = new (value as any).constructor();
      for (const prop in value) {
        // eslint-disable-next-line no-prototype-builtins
        if ((value as any).hasOwnProperty(prop)) {
          cloned[prop] = clone(value[prop]);
        }
      }
      return cloned as T;

      // const clonedObject = Object.create(Object.getPrototypeOf(value));
      // return Object.assign(
      //   clonedObject,
      //   ...Object.keys(value).map(key => ({
      //     [key]: clone((value as any)[key]),
      //   })),
      // ) as T;
    }
  } else {
    return value;
  }
}
