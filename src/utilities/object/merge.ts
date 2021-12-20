const isArray = (value) => Array.isArray(value);

function isSimple(value: any) {
  return (
    value === null ||
    ["undefined", "boolean", "number", "string", "function"].includes(
      (typeof value).trim().toLowerCase()
    )
  );
}

function isReplacer(a: any, b: any) {
  return (
    isSimple(b) ||
    isArray(b) ||
    b instanceof Date ||
    (b && b.__REPLACE__) ||
    isSimple(a) ||
    isArray(a) ||
    a instanceof Date
  );
}

function sortObject(object: any): any {
  // simple value type, return as is
  if (isSimple(object)) return object;

  // array, return map
  if (isArray(object)) return object.map(sortObject);

  // date, return clone
  if (object instanceof Date) return new Date(object.valueOf()); // clone dates

  // return sorted object
  return Object.keys(object)
    .sort()
    .reduce((o, k) => {
      if (object[k] === undefined || k === "__REPLACE__") return o;
      return Object.assign(o, { [k]: sortObject(object[k]) });
    }, {});
}

function deepMerge(objectA: any, objectB: any) {
  // undefined override, return original
  if (objectB === undefined) return sortObject(objectA);

  // null override, use undefined
  if (objectB === null) return undefined;

  if (isReplacer(objectA, objectB)) return sortObject(objectB);

  // return sorted object
  return Object.keys(objectA)
    .concat(Object.keys(objectB))
    .concat()
    .sort()
    .filter(
      (value: any, index: number, array: Array<any>) =>
        array.indexOf(value) === index
    )
    .reduce((o: object, k: any) => {
      const v: any = deepMerge(objectA[k], objectB[k]);
      return v === undefined ? o : Object.assign(o, { [k]: v });
    }, {});
}

export default function merge(...objects: any): object {
  let masterObject = {};

  for (let object of objects) {
    masterObject = deepMerge(masterObject, object);
  }

  return masterObject;
}
