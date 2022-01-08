/**
 * Sort the given object by its keys
 *
 * @param   {object} object
 * @returns {object}
 */
export default function objSort(
  object: object,
  recursive: boolean = true
): object {
  if (typeof object !== "object" || Array.isArray(object)) return object;

  const sortedObject = {};

  const keys = Object.keys(object).sort();

  keys.forEach((key) => {
    sortedObject[key] = recursive ? objSort(object[key]) : object[key];
  });

  return sortedObject;
}
