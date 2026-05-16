import randomString from "./string";

/** Internal: prefixed random id. See {@link Random.id}. */
export default function randomId(length = 6, startsWith = "el-"): string {
  return startsWith + randomString(length);
}
