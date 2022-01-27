/**
 * Get only the given keys from the given object
 *
 * @param   {object} object
 * @param   {array} keys
 * @returns {object}
 */
export default function objOnly(object: object, keys: Array<string>): object {
  const newObject: object = {};

  for (const key of keys) {
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}
