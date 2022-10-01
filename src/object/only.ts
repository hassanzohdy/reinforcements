/**
 * Get only the given keys from the given object
 */
export default function only(object: any, keys: Array<string>): any {
  const newObject: any = {};

  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key];
    }
  }

  return newObject;
}
