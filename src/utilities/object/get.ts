/**
 * Get the value of the given key
 *
 * @param  {object} object
 * @param  {string} key
 * @param  {any} $default
 * @returns any
 */
export default function get(
  object: object,
  key: string,
  $default: any = null
): any {
  try {
    let value = key.split(".").reduce((obj, property) => obj[property], object);

    return undefined === value ? $default : value;
  } catch (err) {
    return $default;
  }
}
