/**
 * Get the value of the given key
 */
export default function get(
  object: object,
  key: string,
  defaultValue: any = null,
): any {
  try {
    const value = key
      .split(".")
      .reduce((obj: any, property: string) => obj[property], object);

    return undefined === value ? defaultValue : value;
  } catch (err) {
    return defaultValue;
  }
}
