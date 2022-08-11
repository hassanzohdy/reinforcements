/**
 * Get all object data except for the given keys
 *
 * @param   {object} object
 * @param   {array} keys
 * @returns {object}
 */
export default function objExcept(object: any, keys: Array<string>): object {
  const newObject: any = { ...object };

  for (const key in newObject) {
    if (keys.includes(key)) {
      delete newObject[key];
    }
  }

  return newObject;
}
