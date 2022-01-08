/**
 * Set the given value to the given key
 * The key is a dot.notation syntax
 *
 * @param  {object} object
 * @param  {string} key
 * @param  {any} value
 * @returns {object}
 */
export default function set(object: object, key: string, value: any): object {
  if (!key.includes(".")) {
    object[key] = value;

    return object;
  }

  let keys: Array<string> = key.split("."),
    currentObject: object = object;

  for (let i = 0; i < keys.length; i++) {
    let key: string = keys[i];
    if (i + 1 == keys.length) {
      currentObject[key] = value;
    } else {
      if (typeof currentObject[key] == "undefined") {
        currentObject = currentObject[key] = {};
      } else {
        currentObject = currentObject[key];
      }
    }
  }

  return object;
}
