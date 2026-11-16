import { cryptoRef } from "../../Random/_internal";

export type ShuffleOptions = {
  /** Mutate the input array in place. Default: `false`. */
  mutate?: boolean;
};

/**
 * Shuffle an array or string using the Fisher–Yates algorithm. Returns a
 * new value by default; pass `{ mutate: true }` to shuffle an array in
 * place. Positions are drawn from the CSPRNG (`crypto.getRandomValues`)
 * when the runtime has one, so the order cannot be predicted or seeded.
 * Without it (for example React Native's Hermes with no polyfill) it falls
 * back to `Math.random`: a shuffle is not a secret, so it must not throw.
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

const UINT32_RANGE = 4294967296;

/** `crypto.getRandomValues` fills at most 65,536 bytes (16,384 uint32) per call. */
const MAX_POOL_SIZE = 16384;

/**
 * Build an unbiased integer source for `[0, bound)`. With a CSPRNG, values
 * come from one pool of uint32 draws that is refilled in batches (one
 * `getRandomValues` call per batch, not per element), and the biased tail
 * is redrawn. Without one it falls back to `Math.random`.
 */
function createRandomBelow(size: number): (bound: number) => number {
  const getRandomValues = cryptoRef.getRandomValues;

  if (typeof getRandomValues !== "function") {
    return (bound) => Math.floor(Math.random() * bound);
  }

  const pool = new Uint32Array(Math.min(Math.max(size, 1), MAX_POOL_SIZE));
  let index = pool.length;

  const next = () => {
    if (index === pool.length) {
      getRandomValues.call(cryptoRef, pool);
      index = 0;
    }

    return pool[index++];
  };

  return (bound) => {
    const limit = UINT32_RANGE - (UINT32_RANGE % bound);

    while (true) {
      const value = next();

      if (value < limit) {
        return value % bound;
      }
    }
  };
}

function fisherYates(array: any[]): void {
  const randomBelow = createRandomBelow(array.length - 1);

  for (let i = array.length - 1; i > 0; i--) {
    const j = randomBelow(i + 1);

    [array[i], array[j]] = [array[j], array[i]];
  }
}
