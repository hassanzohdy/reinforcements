import objGet from "../object/objGet";

/**
 * Get the min value of the given array or the given array of objects using the given key
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function min(array: unknown[], key?: string): number {
  if (!Array.isArray(array)) return 0;

  let minValue = 0;

  for (let i = 0; i < array.length; i++) {
    const value = key ? Number(objGet(array[i], key)) : Number(array[i]);

    if (isNaN(value)) continue;

    if (minValue === 0 || value < minValue) {
      minValue = value;
    }
  }

  return minValue;
}
