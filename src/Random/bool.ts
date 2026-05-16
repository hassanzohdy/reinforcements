import { next } from "./_internal";

/** Internal: fair coin flip. See {@link Random.bool}. */
export default function randomBool(): boolean {
  return next() >= 0.5;
}
