import { GenericObject } from "./types";
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
   */
  public static set(
    object: GenericObject,
    key: string,
    value: unknown,
  ): object {
    return set(object, key, value);
  }

  /**
   * Get the value of the given key
   */
  public static get(
    object: GenericObject,
    key: string,
    $default: unknown = null,
  ): unknown {
    return get(object, key, $default);
  }

  /**
   * Clone the given object to new one
   *
   * @param {object} object
   * @return {object}
   */
  public static clone(object: GenericObject): GenericObject {
    return clone(object);
  }

  /**
   * Merge all given objects into one BIG object
   *
   * @param {any} objects
   * @return {object}
   */
  public static merge(...objects: GenericObject[]): GenericObject {
    return merge(objects[0], ...objects.slice(1));
  }

  /**
   * Sort the given object by its keys
   *
   */
  public static sort(object: GenericObject): GenericObject {
    return sort(object);
  }

  /**
   * Get only the given keys from the given object
   *
   * @param   {object} object
   * @param   {array} keys
   * @returns {object}
   */
  public static only(
    object: GenericObject,
    keys: Array<string>,
  ): GenericObject {
    return only(object, keys);
  }

  /**
   * Get all object data except for the given keys
   *
   * @param   {object} object
   * @param   {array} keys
   * @returns {object}
   */
  public static except(
    object: GenericObject,
    keys: Array<string>,
  ): GenericObject {
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
    object: GenericObject,
    callback: (key: string, value: unknown) => unknown,
  ): Array<unknown> {
    return mapObject(object, callback);
  }

  /**
   * Flatten the given object into one big fat object
   */
  public static flatten(
    object: GenericObject,
    separator = ".",
    parent: string | null = null,
    root: GenericObject = {},
  ): GenericObject {
    return flatten(object, separator, parent, root);
  }
}
