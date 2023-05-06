/**
 * Disclaimer
 * This function is originally taken from https://github.com/jhildenbiddle/mergician
 * But removed unnecessary parts and added some types, also add some comments and updated constant/variable names and types
 */
import Is from "@mongez/supportive-is";

const isObject = Is.plainObject;
const isArray = Array.isArray;

function isDescriptor(object: any) {
  if (!isObject(object)) {
    return false;
  }

  return (
    ("get" in object && typeof object.get === "function") ||
    ("set" in object && typeof object.set === "function") ||
    ("value" in object &&
      ("writable" in object ||
        "enumerable" in object ||
        "configurable" in object))
  );
}

/**
 * Merge deep objects or arrays
 */
export default function merge(...objects: any[]) {
  if (objects.length === 0 || !objects[0]) return objects[0];

  const refinedObjects: any[] = [];

  for (let object of objects) {
    if (isObject(object) || isArray(object)) {
      refinedObjects.push(object);
    }
  }

  if (refinedObjects.length === 0) {
    // return last value
    return objects[objects.length - 1];
  }

  let mergeKeyList;

  let mergeDepth = 0;

  const result: any = refinedObjects.reduce(
    (targetObject: any, srcObject: any) => {
      let keys = mergeKeyList || Object.keys(srcObject);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key in srcObject === false) {
          continue;
        }

        const srcValue = srcObject[key];
        const targetValue = targetObject[key];

        let mergedObject = srcValue;

        if (isArray(mergedObject)) {
          mergedObject = [...mergedObject];
        } else if (isObject(mergedObject) && !isDescriptor(mergedObject)) {
          mergeDepth++;

          if (isObject(targetValue) || isArray(targetValue)) {
            mergedObject = merge(targetValue, mergedObject);
          } else {
            mergedObject = merge(mergedObject);
          }

          mergeDepth--;
        }

        // New descriptor returned via callback
        if (isDescriptor(mergedObject)) {
          // Accessor and data descriptor
          mergedObject.configurable = !("configurable" in mergedObject)
            ? true
            : mergedObject.configurable;
          mergedObject.enumerable = !("enumerable" in mergedObject)
            ? true
            : mergedObject.enumerable;

          // Data descriptor
          if ("value" in mergedObject && !("writable" in mergedObject)) {
            mergedObject.writable = true;
          }

          Object.defineProperty(targetObject, key, mergedObject);
        } else {
          const mergeDescriptor: any = Object.getOwnPropertyDescriptor(
            srcObject,
            key,
          );

          // Accessors (getter/setter)
          if ("get" in mergeDescriptor) {
            Object.defineProperty(targetObject, key, mergeDescriptor);
          }
          // Standard values
          else {
            targetObject[key] = mergedObject;
          }
        }
      }

      return targetObject;
    },
    {},
  );

  return result;
}
