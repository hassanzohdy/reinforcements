import get from "./get";

/**
 * Remove the given keys from the given object using dot notation syntax
 */
export default function unset(object: any, keys: string[]) {
  if (!object || typeof object !== "object" || Array.isArray(object))
    return object;

  // remove the given keys from the given object
  // keys can be nested using dot notation syntax

  for (const key of keys) {
    const keyPath = key.split(".");

    if (keyPath.length === 1) {
      delete object[key];
    } else {
      const lastKey: any = keyPath.pop();
      const parent: any = get(object, keyPath.join("."));
      if (parent) {
        delete parent[lastKey];
      }
    }
  }

  return object;
}
