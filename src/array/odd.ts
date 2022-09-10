import objGet from "../object/objGet";

/**
 * Get the odd values of the given array or the given array of objects using the given key
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function odd(array: unknown[], key?: string): unknown[] {
  if (!Array.isArray(array)) return [];

  return array.filter(item => {
    const value = key ? Number(objGet(item, key)) : Number(item);

    return isNaN(value) ? false : value % 2 !== 0;
  });
}
