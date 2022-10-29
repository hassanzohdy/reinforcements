function canBeFlatten(value: any): boolean {
  return value !== null && typeof value === "object";
}

function toPlainObject(object) {
  if (Array.isArray(object)) {
    return object.map(item => toPlainObject(item));
  }

  if (canBeFlatten(object)) {
    const clonedObject: any = Object.keys(object).reduce((acc, key) => {
      if (typeof object[key] === "function") return acc;

      acc[key] = toPlainObject(object[key]);
      return acc;
    }, {});

    // clone the prototype
    clonedObject.__proto__ = object.__proto__;

    return clonedObject;
  }

  return object;
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
  if (canBeFlatten(object) === false) {
    return object;
  }

  object = toPlainObject(object);

  for (const key of Object.keys(object)) {
    const value: any = object[key];

    const keyChain = parent ? parent + separator + key : key;

    if (Array.isArray(value) && value.length === 0) {
      root[keyChain] = value;
    } else if (canBeFlatten(value)) {
      if (keepNestedOriginalObject) {
        root[keyChain] = value;
      }

      flatten(value, separator, keepNestedOriginalObject, keyChain, root);
    } else {
      root[keyChain] = value;
    }
  }

  return root;
}
