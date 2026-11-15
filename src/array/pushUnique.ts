/**
 * Push once one or more values to the array if and
 * only if the value doesn't exists in the array
 */
export default function pushUnique<T = any>(array: T[], ...items: T[]): T[] {
  const seen = new Set<T>(array);
  const newItems: T[] = [];

  for (const item of items) {
    if (seen.has(item)) continue;

    seen.add(item);
    newItems.push(item);
  }

  for (const item of newItems) {
    array.push(item);
  }

  return array;
}
