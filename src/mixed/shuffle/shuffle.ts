export type ShuffleOptions = {
  /** Mutate the input array in place. Default: `false`. */
  mutate?: boolean;
};

/**
 * Shuffle an array or string using the Fisher–Yates algorithm. Returns a
 * new value by default; pass `{ mutate: true }` to shuffle an array in
 * place.
 *
 * @example
 * shuffle([1, 2, 3, 4]); // e.g. [3, 1, 4, 2]
 * shuffle("hello"); // e.g. "lehlo"
 */
export default function shuffle<T>(value: T[], options?: ShuffleOptions): T[];
export default function shuffle(
  value: string,
  options?: ShuffleOptions,
): string;
export default function shuffle(
  value: any,
  options: ShuffleOptions = {},
): any {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "string") {
    const chars = Array.from(value);

    fisherYates(chars);

    return chars.join("");
  }

  if (!Array.isArray(value)) {
    return value;
  }

  const target = options.mutate ? value : value.slice();

  fisherYates(target);

  return target;
}

function fisherYates(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}
