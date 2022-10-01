function canBeFlatten(value: any): boolean {
  return value !== null && typeof value === "object";
}

/**
 * Flatten the given object into one big fat object
 */
export default function flatten(
  object: any,
  separator = ".",
  keepNestedOriginalObject = false,
  parent?: string,
  root: any = {},
): any {
  if (canBeFlatten(object) === false) return object;

  for (const key of Object.keys(object)) {
    const value: any = object[key];

    const keyChain = parent ? parent + separator + key : key;

    if (Array.isArray(value) && value.length === 0) {
      root[keyChain] = value;
    } else if (canBeFlatten(value) === true) {
      if (keepNestedOriginalObject) {
        root[keyChain] = value; // add the original object/array as well
      }

      flatten(value, separator, keepNestedOriginalObject, keyChain, root);
    } else {
      root[keyChain] = value;
    }
  }

  return root;
}
