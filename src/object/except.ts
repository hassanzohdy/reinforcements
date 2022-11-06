import unset from "./unset";

/**
 * Get all object data except for the given keys using dot notation syntax
 */
export default function except(object: any, keys: Array<string>): any {
  if (!object || typeof object !== "object" || Array.isArray(object))
    return object;

  const newObject = { ...object };

  return unset(newObject, keys);
}
