import sum from "./sum";

/**
 * Get the average value of the given array or the given array of objects using the given key
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function average(array: any[], key?: string): number {
  if (!Array.isArray(array)) return 0;

  return sum(array, key) / array.length;
}
