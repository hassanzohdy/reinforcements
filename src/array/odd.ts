import get from "../object/get";

/**
 * Get the odd values of the given array or the given array of objects using the given key
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function odd(array: any[], key?: string): any[] {
  if (!Array.isArray(array)) return [];

  return array.filter(item => {
    const value = key ? Number(get(item, key)) : Number(item);

    return isNaN(value) ? false : value % 2 !== 0;
  });
}
