/**
 * Get the values of the given array by the even indexes or the given array of objects using the given key
 */
export default function evenIndexes(array: unknown[]): unknown[] {
  if (!Array.isArray(array)) return [];

  return array.filter((_item, index) => index % 2 === 0);
}
