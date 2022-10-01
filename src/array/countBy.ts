import get from "../object/get";

/**
 * Count the occurrences of values in an array for the given key
 */
export default function countBy(array: any[], key: string) {
  if (!Array.isArray(array)) {
    return {};
  }

  return array.reduce((result, item) => {
    const value = get(item, key);

    if (result[value]) {
      result[value]++;
    } else {
      result[value] = 1;
    }

    return result;
  }, {});
}
