/**
 * Prepend once one or more values to the array if and
 * only if the value doesn't exists in the array
 */
export default function prependUnique<T>(array: T[], ...items: T[]): T[] {
  items.forEach(item => {
    if (!array.includes(item)) {
      array.unshift(item);
    }
  });

  return array;
}
