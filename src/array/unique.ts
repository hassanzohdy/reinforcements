import pluck from "./pluck";

/**
 * Get unique values of the array
 */
export default function unique(array: any[], key?: string): any[] {
  if (!Array.isArray(array)) return [];

  if (key) {
    array = pluck(array, key);

    if (!Array.isArray(array)) return [];
  }

  return [...new Set(array)];
}
