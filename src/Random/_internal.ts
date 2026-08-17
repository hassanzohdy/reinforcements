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

type RandomValues = <T extends ArrayBufferView>(array: T) => T;

const BYTE_VALUES = 256;

/** Thrown by every security-shaped generator when no CSPRNG exists. */
export const NO_CSPRNG_ERROR =
  "No CSPRNG available: crypto.getRandomValues is required";

/**
 * Return the runtime CSPRNG, throwing when there is none. Tokens, ids
 * and uuids must never silently degrade to the seedable `next()` — a
 * predictable token is worse than a loud failure.
 */
function requireCsprng(): RandomValues {
  if (typeof cryptoRef.getRandomValues !== "function") {
    throw new Error(NO_CSPRNG_ERROR);
  }

  return cryptoRef.getRandomValues.bind(cryptoRef);
}

/** Cryptographically secure random bytes. Throws without a CSPRNG. */
export function cryptoBytes(size: number): Uint8Array {
  return requireCsprng()(new Uint8Array(size));
}

/**
 * Build a `length`-character string out of `charset` using CSPRNG
 * bytes. Bytes above the largest multiple of the charset size are
 * rejected and redrawn so every character stays equally likely — a
 * plain `byte % charset.length` would bias the leading characters.
 *
 * Throws when no CSPRNG is available, whatever the requested length.
 */
export function cryptoStringOf(charset: string, length: number): string {
  const getRandomValues = requireCsprng();
  const size = charset.length;
  const limit = Math.floor(BYTE_VALUES / size) * size;

  let text = "";

  while (text.length < length) {
    const bytes = getRandomValues(new Uint8Array(length - text.length));

    for (let i = 0; i < bytes.length && text.length < length; i++) {
      if (bytes[i] >= limit) continue;

      text += charset.charAt(bytes[i] % size);
    }
  }

  return text;
}

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
