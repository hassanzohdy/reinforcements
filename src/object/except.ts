import omit from "./omit";

/**
 * @deprecated Use {@link omit} instead. Will be removed in a future major release.
 */
export default function except(object: any, keys: Array<string>): any {
  return omit(object, keys);
}
