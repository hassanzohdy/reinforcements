import objGet from "../object/objGet";

/**
 * Sum the total value of the array
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function sum(array: unknown[], key?: string): number {
  if (!Array.isArray(array)) return 0;

  return array.reduce((total, item) => {
    const value = key ? Number(objGet(item, key)) : Number(item);

    return isNaN(value) ? total : total + value;
  }, 0);
}
