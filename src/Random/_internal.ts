export const ALPHANUMERIC =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const URL_SAFE =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

type CryptoRef = {
  randomUUID?: () => string;
  getRandomValues?: <T extends ArrayBufferView>(array: T) => T;
};

export const cryptoRef: CryptoRef =
  typeof globalThis !== "undefined" && (globalThis as any).crypto
    ? (globalThis as any).crypto
    : {};

let rngState: number | undefined;

export function setSeed(seed?: number): void {
  rngState = seed;
}

/**
 * Return the next pseudo-random value in `[0, 1)`. Uses `Math.random` by
 * default; switches to a seeded mulberry32 PRNG when `setSeed` is called
 * with a numeric seed.
 */
export function next(): number {
  if (rngState === undefined) {
    return Math.random();
  }

  rngState |= 0;
  rngState = (rngState + 0x6d2b79f5) | 0;

  let t = rngState;

  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
