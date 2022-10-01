import merge from "src/object/merge";

/**
 * Make a deep copy for the given object/array and its nested objects/arrays as well
 */
export default function clone(value: any) {
  if (Array.isArray(value)) {
    return [...value];
  }

  if (value && typeof value === "object") {
    return merge({}, value);
  }

  return value;
}
