import { get } from "..";
import { GenericObject } from "../types";

/**
 * Group the given array by the given key(s).
 *
 * The key(s) support dot notation.
 */
export default function groupBy(
  array: GenericObject[],
  groupByKey: string | string[],
  listAs = "data",
): GenericObject[] {
  const newData: {
    [key: string]: {
      [key: string]: any;
      data?: GenericObject[];
    };
  } = {};

  const groupByKeys =
    typeof groupByKey === "string" ? [groupByKey] : groupByKey;

  for (const item of array) {
    const baseKeys: Array<{
      key: string;
      value: any;
    }> = [];

    for (const groupByKey of groupByKeys) {
      const value = get(item, groupByKey);
      if (!value) break;

      baseKeys.push({
        key: groupByKey,
        value,
      });
    }

    const dataKey = JSON.stringify(baseKeys);

    if (!newData[dataKey]) {
      const groupedDataList: {
        [key: string]: any;
      } = {
        data: [],
      };

      for (const groupByKeyData of baseKeys) {
        groupedDataList[groupByKeyData.key] = groupByKeyData.value;
      }

      newData[dataKey] = groupedDataList;
    }

    newData[dataKey]?.data?.push(item);
  }

  const finalData: GenericObject[] = [];

  for (const groupedKeyWithValue in newData) {
    const { data, ...otherGroupedKeys } = newData[groupedKeyWithValue];

    finalData.push({
      ...otherGroupedKeys,
      [listAs]: data,
    });
  }

  return finalData;
}
