import { GenericObject } from "../../types";

/**
 * Sort the given object by its keys
 */
export default function objSort(
  object: GenericObject,
  recursive = true,
): GenericObject {
  if (!object || typeof object !== "object" || Array.isArray(object))
    return object;

  const sortedObject: GenericObject = {};

  const keys = Object.keys(object).sort();

  keys.forEach((key: string) => {
    sortedObject[key] = recursive
      ? objSort(object[key] as GenericObject)
      : object[key];
  });

  return sortedObject;
}
