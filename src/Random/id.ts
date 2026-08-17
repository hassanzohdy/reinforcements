import randomString from "./string";

/**
 * Internal: prefixed random id. See {@link Random.id}.
 *
 * Id-shaped, so it inherits the CSPRNG backing of {@link randomString}.
 */
export default function randomId(length = 6, startsWith = "el-"): string {
  return startsWith + randomString(length);
}
