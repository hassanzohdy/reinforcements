import { setSeed } from "./_internal";
import randomBool from "./bool";
import randomColor from "./color";
import randomDate, { type RandomDateOptions } from "./date";
import randomFloat from "./float";
import randomId from "./id";
import randomInt from "./int";
import randomNanoid from "./nanoid";
import randomPick from "./pick";
import randomSample from "./sample";
import randomString from "./string";
import randomToken from "./token";
import randomUuid from "./uuid";
import randomWeighted, { type WeightedItem } from "./weighted";

export type { RandomDateOptions, WeightedItem };

/**
 * Random — namespace class collecting every RNG helper as a static
 * method.
 *
 * Defaults to `Math.random`; switches to a seeded mulberry32 PRNG
 * when `Random.seed(n)` is called. Passing `undefined` to `seed`
 * restores the default behavior.
 *
 * This class is not meant to be instantiated — every member is
 * static. The private constructor enforces that.
 *
 * @example
 * Random.int(1, 10);
 * Random.uuid();
 *
 * Random.seed(42);
 * const a = Random.int(1, 1000);
 *
 * Random.seed(42);
 * const b = Random.int(1, 1000);
 *
 * a === b; // true — reproducible
 */
export default class Random {
  /**
   * Namespace class — not instantiable. Use the static members.
   */
  private constructor() {
    // intentionally empty
  }

  /**
   * Seed the RNG with a number to produce reproducible output. Call
   * with no argument to restore the default `Math.random` behavior.
   *
   * @example
   * Random.seed(42); // deterministic from here
   * Random.seed();   // back to Math.random
   */
  public static seed(seed?: number): void {
    setSeed(seed);
  }

  /**
   * Random integer in the inclusive range `[min, max]`.
   *
   * @example
   * Random.int(1, 10); // e.g. 7
   */
  public static int(min = 1, max = 9999999): number {
    return randomInt(min, max);
  }

  /**
   * Random float in `[min, max)`, optionally rounded to `precision`
   * decimal places.
   *
   * @example
   * Random.float(0, 1, 2); // e.g. 0.42
   */
  public static float(min = 0, max = 1, precision?: number): number {
    return randomFloat(min, max, precision);
  }

  /**
   * Random boolean — a fair coin flip.
   *
   * @example
   * Random.bool(); // true or false
   */
  public static bool(): boolean {
    return randomBool();
  }

  /**
   * Random alphanumeric string of the given length.
   *
   * @example
   * Random.string(8); // e.g. "Xk2pQ9aZ"
   */
  public static string(length = 32): string {
    return randomString(length);
  }

  /**
   * Random alphanumeric id prefixed by `startsWith`.
   *
   * @example
   * Random.id();          // e.g. "el-X4kP2a"
   * Random.id(4, "user-"); // e.g. "user-q7Zw"
   */
  public static id(length = 6, startsWith = "el-"): string {
    return randomId(length, startsWith);
  }

  /**
   * Random `Date` between `options.min` and `options.max`. Both
   * bounds default to a window ending at `now()` and extending
   * ~1158 days backward.
   *
   * @example
   * Random.date({ min: new Date("2020-01-01"), max: new Date("2024-12-31") });
   */
  public static date(options: RandomDateOptions = {}): Date {
    return randomDate(options);
  }

  /**
   * Random `#rrggbb` hex color, always padded to 6 hex digits.
   *
   * @example
   * Random.color(); // e.g. "#1f3a8a"
   */
  public static color(): string {
    return randomColor();
  }

  /**
   * Pick a single random element from `array`, or `undefined` when
   * the array is empty.
   *
   * @example
   * Random.pick(["a", "b", "c"]); // e.g. "b"
   */
  public static pick<T>(array: readonly T[]): T | undefined {
    return randomPick(array);
  }

  /**
   * Sample `n` unique elements from `array` (Fisher–Yates partial
   * shuffle). Returns `[]` when the input is empty or `n <= 0`.
   *
   * @example
   * Random.sample([1, 2, 3, 4, 5], 3); // e.g. [3, 1, 5]
   */
  public static sample<T>(array: readonly T[], n: number): T[] {
    return randomSample(array, n);
  }

  /**
   * Pick a value from a weighted list `[{ value, weight }, ...]`.
   * Negative weights are clamped to `0`; returns `undefined` when
   * every weight is `0`.
   *
   * @example
   * Random.weighted([
   *   { value: "free",    weight: 80 },
   *   { value: "premium", weight: 19 },
   *   { value: "vip",     weight:  1 },
   * ]);
   */
  public static weighted<T>(
    items: ReadonlyArray<WeightedItem<T>>,
  ): T | undefined {
    return randomWeighted(items);
  }

  /**
   * Generate an RFC 4122 v4 UUID. Uses `crypto.randomUUID` when
   * available; falls back to `crypto.getRandomValues`, then to the
   * internal PRNG.
   *
   * @example
   * Random.uuid(); // "0a8b40e1-d3ef-4d2e-87f4-1a8b40e1d3ef"
   */
  public static uuid(): string {
    return randomUuid();
  }

  /**
   * URL-safe random id of the given size. Uses the alphabet
   * `A-Z a-z 0-9 _ -`.
   *
   * @example
   * Random.nanoid();   // 21-char default
   * Random.nanoid(10); // "rH3kQ_pX7a"
   */
  public static nanoid(size = 21): string {
    return randomNanoid(size);
  }

  /**
   * Crypto-backed hex string of `bytes` random bytes. Returns a
   * `bytes * 2`-character lowercase hex string.
   *
   * @example
   * Random.token(16); // 32-char hex token
   */
  public static token(bytes = 16): string {
    return randomToken(bytes);
  }
}
