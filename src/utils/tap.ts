/**
 * Run `sideEffect` against `value`, then return `value` unchanged.
 * Useful for inserting logging / instrumentation into a pipeline.
 *
 * @example
 * pipe(2, n => n + 1, tap.with(console.log), n => n * 10);
 * // logs 3, returns 30
 */
export default function tap<T>(value: T, sideEffect: (value: T) => void): T {
  sideEffect(value);

  return value;
}

/**
 * Curried form: `tap.with(fn)` returns a pipeline-friendly
 * `(value) => value` that runs the side effect.
 */
tap.with = function tapWith<T>(
  sideEffect: (value: T) => void,
): (value: T) => T {
  return (value: T) => {
    sideEffect(value);

    return value;
  };
};
