/**
 * Map the given object into an array
 *
 * @param   {object} object
 * @param   {function} callback
 * @returns {Array<any>}
 */
export default function objMap(object, callback): Array<any> {
  return Object.keys(object).map((key) => {
    return callback(key, object[key]);
  });
}
