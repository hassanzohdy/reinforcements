import { ArrayCallback } from "../contracts/Collectable";
import objGet from "../object/objGet";

/**
 * Count data by the given key or callback
 */
export default function count(
  data: unknown[],
  key: string | ArrayCallback,
): number {
  if (!Array.isArray(data)) return 0;

  if (typeof key === "string") {
    return data.filter(
      item =>
        objGet(item as object, key, "__MISSING__KEY__COUNT__") !==
        "__MISSING__KEY__COUNT__",
    ).length;
  }

  return data.filter(key).length;
}
