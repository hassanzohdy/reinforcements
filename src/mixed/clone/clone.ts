export default function clone<T>(value: T): T {
  if (typeof value !== "object" || value === null) {
    // if value is not an object or is null, return the value as is
    return value;
  }

  if (Array.isArray(value)) {
    // if value is an array, create a new array and clone its elements recursively
    const clonedArray: any[] = [];

    for (const element of value) {
      clonedArray.push(clone(element));
    }

    return clonedArray as T;
  }

  // if value is an object, create a new object and clone its properties recursively
  const clonedObject = Object.create(Object.getPrototypeOf(value));

  for (const property in value) {
    if (Object.prototype.hasOwnProperty.call(value, property)) {
      clonedObject[property] = clone(value[property]);
    }
  }

  return clonedObject as T;
}
