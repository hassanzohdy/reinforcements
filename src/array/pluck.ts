import objGet from "../object/objGet";
import objOnly from "../object/objOnly";

/**
 * Pluck the given array by the given key
 * If the second argument is sent as object , it will return an array of objects
 * otherwise, it will return an array of values
 *
 * The key supports dot notation. syntax: "key1.key2.key3"
 */
export default function pluck(array: any[], key?: string | string[]): any[] {
  if (!Array.isArray(array)) return [];

  if (key) {
    if (typeof key === "string") {
      return array.map(item => objGet(item, key));
    }

    if (Array.isArray(key)) {
      return array.map(item => objOnly(item, key));
    }
  }

  return array;
}
