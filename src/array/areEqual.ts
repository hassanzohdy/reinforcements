/**
 * Determine if the given arrays are equal to each other
 */
export default function areEqual(array1: any[], array2: any[]): boolean {
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}
