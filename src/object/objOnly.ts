import { GenericObject } from "../../types";

/**
 * Get only the given keys from the given object
 */
export default function objOnly(
  object: GenericObject,
  keys: Array<string>,
): GenericObject {
  const newObject: GenericObject = {};

  for (const key of keys) {
    if (Object.hasOwn(object, key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}
