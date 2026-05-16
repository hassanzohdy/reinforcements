import pick from "./pick";

/**
 * @deprecated Use {@link pick} instead. Will be removed in a future major release.
 */
export default function only(object: any, keys: Array<string>): any {
  return pick(object, keys);
}
