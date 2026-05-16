/**
 * Return a function that always produces `value`, ignoring its arguments.
 *
 * @example
 * const always42 = constant(42);
 * always42("anything"); // 42
 */
export default function constant<T>(value: T): () => T {
  return () => value;
}
