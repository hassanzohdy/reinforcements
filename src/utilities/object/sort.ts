/**
 * Sort the given object by its keys
 *
 * @param   {object} object
 * @returns {object}
 */
export default function sort(object: object): object {
  return Object.keys(object)
    .sort()
    .reduce((accumulator: object, currentValue) => {
      accumulator[currentValue] = object[currentValue];
      return accumulator;
    }, {});
}
