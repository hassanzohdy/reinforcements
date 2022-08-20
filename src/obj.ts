import clone from "./utilities/object/objClone";
import except from "./utilities/object/objExcept";
import flatten from "./utilities/object/objFlatten";
import get from "./utilities/object/objGet";
import mapObject from "./utilities/object/objMap";
import merge from "./utilities/object/objMerge";
import only from "./utilities/object/objOnly";
import set from "./utilities/object/objSet";
import sort from "./utilities/object/objSort";

/**
 * Object Class Handler
 *
 * @export
 * @class Obj
 */
export default class Obj {
  /**
   * Set the given value to the given key
   * The key is a dot.notation syntax
   *
   * @param  {object} object
   * @param  {string} key
   * @param  {any} value
   * @returns {object}
   */
  public static set(object: object, key: string, value: any): object {
    return set(object, key, value);
  }

  /**
   * Get the value of the given key
   *
   * @param  {object} object
   * @param  {string} key
   * @param  {any} $default
   * @returns any
   */
  public static get(object: object, key: string, $default: any = null): any {
    return get(object, key, $default);
  }

  /**
   * Clone the given object to new one
   *
   * @param {object} object
   * @return {object}
   */
  public static clone(object: object): object {
    return clone(object);
  }

  /**
   * Merge all given objects into one BIG object
   *
   * @param {any} objects
   * @return {object}
   */
  public static merge(...objects: any): object {
    return merge(objects[0], ...objects.slice(1));
  }

  /**
   * Sort the given object by its keys
   *
   * @param   {object} object
   * @returns {object}
   */
  public static sort(object: object): object {
    return sort(object);
  }

  /**
   * Get only the given keys from the given object
   *
   * @param   {object} object
   * @param   {array} keys
   * @returns {object}
   */
  public static only(object: object, keys: Array<string>): object {
    return only(object, keys);
  }

  /**
   * Get all object data except for the given keys
   *
   * @param   {object} object
   * @param   {array} keys
   * @returns {object}
   */
  public static except(object: object, keys: Array<string>): object {
    return except(object, keys);
  }

  /**
   * Get only the given keys from the given object
   *
   * @param   {object} object
   * @param   {array} keys
   * @returns {Array<any>}
   */
  public static map(
    object: object,
    callback: (key: string, value: any) => any,
  ): Array<any> {
    return mapObject(object, callback);
  }

  /**
   * Flatten the given object into one big fat object
   */
  public static flatten(
    object: any,
    separator = ".",
    parent: string | null = null,
    root: any = {},
  ): any {
    return flatten(object, separator, parent, root);
  }
}
