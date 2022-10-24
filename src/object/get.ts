import flatten from "./flatten";

/**
 * Get the value of the given key
 */
export default function get(
  object: any,
  key: string,
  defaultValue: any = null,
): any {
  const flattenObject = flatten(object, ".", true);

  if (!flattenObject) return defaultValue;

  if (flattenObject.hasOwnProperty(key)) {
    return flattenObject[key];
  }

  return defaultValue;
}
