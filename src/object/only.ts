import get from "./get";
import set from "./set";

/**
 * Get only the given keys from the given object
 */
export default function only(object: any, keys: Array<string>): any {
  const newObject: any = {};

  for (const key of keys) {
    const value = get(object, key, undefined);

    if (value !== undefined) {
      set(newObject, key, value);
    }
  }

  return newObject;
}
