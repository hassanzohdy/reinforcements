import randomInt from "./int";

export type RandomDateOptions = {
  min?: Date;
  max?: Date;
};

const DEFAULT_RANGE_MS = 100_000_000_000;

/** Internal: random `Date` between bounds. See {@link Random.date}. */
export default function randomDate(options: RandomDateOptions = {}): Date {
  const now = Date.now();

  const min = options.min?.getTime() ?? now - DEFAULT_RANGE_MS;
  const max = options.max?.getTime() ?? now;

  return new Date(randomInt(min, max));
}
