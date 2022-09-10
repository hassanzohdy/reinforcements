/**
 * Chunk array|string by the given size
 */
export default function chunk(
  array: unknown[] | string,
  size: number,
): unknown[] {
  if (!Array.isArray(array) && typeof array !== "string") return [];

  const result: unknown[] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
