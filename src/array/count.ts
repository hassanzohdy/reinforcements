import get from "../object/get";

const notFound = Symbol("notFound");

/**
 * Count data by the given key or callback
 */
export default function count(
  data: any[],
  key: string | Parameters<typeof Array.prototype.filter>[0],
): number {
  if (!Array.isArray(data)) return 0;

  if (typeof key === "string") {
    return data.filter(item => get(item as object, key, notFound) !== notFound)
      .length;
  }

  return data.filter(key).length;
}
