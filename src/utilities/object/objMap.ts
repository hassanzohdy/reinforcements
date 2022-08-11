/**
 * Map the given object into an array
 *
 * @param   {object} object
 * @param   {function} callback
 * @returns {Array<any>}
 */
export default function objMap(
  object: any,
  callback: (key: string, value: any) => any
): Array<any> {
  return Object.keys(object).map((key) => {
    return callback(key, object[key]);
  });
}
