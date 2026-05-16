/**
 * Linear interpolation between `a` and `b` by factor `t`.
 *
 * @example
 * lerp(0, 100, 0.25); // 25
 */
export default function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
