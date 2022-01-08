import merge from "./merge";

export default function clone(object: any): any {
  return merge({}, object);
}
