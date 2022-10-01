/**
 * Get all object data except for the given keys
 */
export default function except(object: any, keys: Array<string>): any {
  if (!object || typeof object !== "object" || Array.isArray(object))
    return object;

  const newObject: any = { ...object };

  for (const key in newObject) {
    if (keys.includes(key)) {
      delete newObject[key];
    }
  }

  return newObject;
}
