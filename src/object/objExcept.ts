import { GenericObject } from "../../types";

/**
 * Get all object data except for the given keys
 */
export default function objExcept(
  object: GenericObject,
  keys: Array<string>,
): GenericObject {
  const newObject: GenericObject = { ...object };

  for (const key in newObject) {
    if (keys.includes(key)) {
      delete newObject[key];
    }
  }

  return newObject;
}
