/**
 * Sort the given object by its keys
 */
export default function sort(object: any, recursive = true): any {
  if (!object || typeof object !== "object" || Array.isArray(object))
    return object;

  const sortedObject: any = {};

  const keys = Object.keys(object).sort();

  keys.forEach((key: string) => {
    sortedObject[key] = recursive ? sort(object[key]) : object[key];
  });

  return sortedObject;
}
