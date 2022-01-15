function canBeFlatten(value: any): boolean {
  return value && typeof value === "object";
}

/**
 * Flatten the given object into one big fat object
 */
export default function flatten(
  object: any,
  separator = ".",
  parent: string | null = null,
  root: any = {}
): any {
  if (canBeFlatten(object) === false) return object;

  for (const key of Object.keys(object)) {
    const value: any = object[key];

    const keyChain = parent ? parent + separator + key : key;

    if (canBeFlatten(value) === true) {
      flatten(value, separator, keyChain, root);
    } else {
      root[keyChain] = value;
    }
  }

  return root;
}
