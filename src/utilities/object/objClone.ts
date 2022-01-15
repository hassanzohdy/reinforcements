import { fromJS } from "Immutable";

/**
 * Make a deep copy for the given object and its nested objects as well
 */
export default function clone(object: any): any {
  return fromJS(object).toJS();
}
