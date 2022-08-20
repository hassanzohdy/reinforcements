/**
 * Sort the given object by its keys
 */
export default function objSort(
  object: Record<string, unknown> | unknown[],
  recursive = true,
): object {
  if (typeof object !== "object" || Array.isArray(object)) return object;

  const sortedObject: Record<string, unknown> = {};

  const keys = Object.keys(object).sort();

  keys.forEach((key: string) => {
    sortedObject[key] = recursive
      ? objSort(object[key] as Record<string, unknown>)
      : object[key];
  });

  return sortedObject;
}
