/**
 * Get only the given keys from the given object
 *
 * @param   {object} object
 * @param   {array} keys
 * @returns {object}
 */
export default function objOnly(object: object, keys: Array<string>): object {
  let newObject: object = {};

  for (let key of keys) {
    newObject[key] = object[key];
  }

  return newObject;
}
