/**
 * Prepend once one or more values to the array if and
 * only if the value doesn't exists in the array
 */
export default function unshiftUnique<T = any>(array: T[], ...items: T[]): T[] {
  const seen = new Set<T>(array);
  const newItems: T[] = [];

  for (const item of items) {
    if (seen.has(item)) continue;

    seen.add(item);
    newItems.push(item);
  }

  // each new item lands in front of the previous ones, like one `unshift`
  // per item; a single bulk `unshift` shifts the array only once
  array.unshift(...newItems.reverse());

  return array;
}
