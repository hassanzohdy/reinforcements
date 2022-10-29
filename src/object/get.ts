function getValue(object: any, keyChain: string, defaultValue: any) {
  // split the key chain into array by dot
  // then loop through the array and get the value of each key until the last key
  // then return the value of the last key
  return keyChain.split(".").reduce((acc, key) => {
    if (acc === undefined || typeof acc !== "object") {
      return defaultValue;
    }

    if (acc === null) return acc;

    return acc.hasOwnProperty && acc.hasOwnProperty(key)
      ? acc[key]
      : defaultValue;
  }, object);
}

/**
 * Get the value of the given key
 */
export default function get(
  object: any,
  key: string,
  defaultValue: any = null,
): any {
  if (!object) return defaultValue;

  if (object[key]) return object[key];

  return getValue(object, key, defaultValue);
}
