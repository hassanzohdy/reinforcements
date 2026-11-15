import get from "../object/get";
import safeAssign from "../object/safeAssign";

/**
 * Count the occurrences of values in an array for the given key
 */
export default function countBy(
  array: any[],
  key: string,
): { [key: string]: number } {
  if (!Array.isArray(array)) {
    return {};
  }

  return array.reduce((result, item) => {
    const value = get(item, key);

    // Own-property check: inherited names such as `constructor` must
    // start at 1, and `__proto__` must be counted as an ordinary key.
    const count = Object.prototype.hasOwnProperty.call(result, value)
      ? result[value]
      : 0;

    safeAssign(result, value, count + 1);

    return result;
  }, {});
}
