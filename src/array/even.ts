import get from "../object/get";

/**
 * Get the even values of the given array or the given array of objects using the given key
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function even(array: any[], key?: string): any[] {
  if (!Array.isArray(array)) return [];

  return array.filter(item => {
    const value = key ? get(item, key) : item;

    return typeof value !== "number" ? false : value % 2 === 0;
  });
}
