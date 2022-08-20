/**
 * Get the value of the given key
 *
 * @param  {object} object
 * @param  {string} key
 * @param  {any} $default
 * @returns any
 */
export default function objGet(
  object: object,
  key: string,
  $default: any = null,
): any {
  try {
    const value = key
      .split(".")
      .reduce((obj: any, property: string) => obj[property], object);

    return undefined === value ? $default : value;
  } catch (err) {
    return $default;
  }
}
