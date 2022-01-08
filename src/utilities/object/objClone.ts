import merge from "./objMerge";

export default function clone(object: any): any {
  return merge({}, object);
}
