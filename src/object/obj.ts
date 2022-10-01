import areEqual from "src/mixed/areEqual/areEqual";
import clone from "../mixed/clone/clone";
import except from "./except";
import flatten from "./flatten";
import get from "./get";
import map from "./map";
import merge from "./merge";
import only from "./only";
import set from "./set";
import sort from "./sort";

/**
 * Object methods
 */
const Obj = {
  set,
  get,
  merge,
  clone,
  sort,
  only,
  except,
  map,
  flatten,
  areEqual,
};

export default Obj;
