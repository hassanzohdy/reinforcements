type PropsInput = Record<string, unknown>;

type UnwrapValues<T extends PropsInput> = {
  [K in keyof T]: Awaited<T[K]>;
};

/**
 * Run an object's worth of promises in parallel, resolving to an object
 * with the same keys but unwrapped values. Non-promise values are
 * passed through unchanged.
 *
 * Modelled on Bluebird's `Promise.props`. Ideal for parallel
 * destructuring of independent async work.
 *
 * @example
 * const { user, settings, home } = await pProps({
 *   user:     getUserFromDB(),
 *   settings: loadSettingsAsync(),
 *   home:     getHome(),
 * });
 *
 * @example
 * // Plain values are allowed alongside promises:
 * await pProps({ a: 1, b: Promise.resolve(2) }); // { a: 1, b: 2 }
 */
export default async function pProps<T extends PropsInput>(
  object: T,
): Promise<UnwrapValues<T>> {
  const keys = Object.keys(object) as Array<keyof T & string>;
  const values = await Promise.all(keys.map(key => object[key]));

  const result = {} as UnwrapValues<T>;

  for (let i = 0; i < keys.length; i++) {
    (result as any)[keys[i]] = values[i];
  }

  return result;
}
