/**
 * Determine if the given values are equal to each other
 */
export default function areEqual(value: any, value2: any): boolean {
  if (
    ["symbol", "number", "boolean", "string", "undefined"].includes(
      typeof value,
    ) ||
    !value ||
    !value2
  ) {
    return value === value2;
  }

  if (Array.isArray(value)) {
    value = value.sort();
  }

  if (Array.isArray(value2)) {
    value2 = value2.sort();
  }

  return JSON.stringify(value) === JSON.stringify(value2);
}
