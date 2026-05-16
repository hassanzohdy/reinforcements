/**
 * Parse `value` as a number. Returns `fallback` when the input is
 * `null`/`undefined`/empty string or cannot be parsed.
 *
 * @example
 * parseNumber("42"); // 42
 * parseNumber("abc", -1); // -1
 * parseNumber(null, 0); // 0
 */
export default function parseNumber<F = number>(
  value: unknown,
  fallback?: F,
): number | F {
  const fallbackValue = (fallback ?? 0) as number | F;

  if (value === null || value === undefined || value === "") {
    return fallbackValue;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return fallbackValue;
  }

  return parsed;
}
