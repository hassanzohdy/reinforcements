/**
 * Shuffle array items
 */
export default function shuffle<T>(array: T[]): T[] {
  if (!Array.isArray(array)) return [];
  return array.sort(() => Math.random() - 0.5);
}
