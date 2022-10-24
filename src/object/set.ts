/**
 * Set the given value to the given key
 * The key supports dot.notation syntax
 */
export default function set(
  object: Record<string, any>,
  key: string,
  value: any,
): object {
  if (!object || typeof object !== "object") return object;

  if (!key.includes(".")) {
    object[key] = value;

    return object;
  }

  const keys: Array<string> = key.split(".");

  let currentObject = object;

  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i];
    if (i + 1 === keys.length) {
      currentObject[key] = value;
    } else {
      if (typeof currentObject[key] === "undefined") {
        currentObject = currentObject[key] = {};
      } else {
        currentObject = currentObject[key] as Record<string, any>;
      }
    }
  }

  return object;
}
