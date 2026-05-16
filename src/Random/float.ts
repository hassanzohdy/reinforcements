import { next } from "./_internal";

/** Internal: random float in `[min, max)`. See {@link Random.float}. */
export default function randomFloat(
  min = 0,
  max = 1,
  precision?: number,
): number {
  const value = next() * (max - min) + min;

  if (precision === undefined) {
    return value;
  }

  const multiplier = Math.pow(10, precision);

  return Math.round(value * multiplier) / multiplier;
}
