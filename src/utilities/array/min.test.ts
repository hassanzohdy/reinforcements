import { orders } from "../../../tests/data";
import { unknownValue } from "../../../tests/utils";
import min from "./min";

test("Get min value of the array using the given key", () => {
  const minAmount = min(orders, "amount");

  expect(minAmount).toEqual(100);
});

test("Get min value of the array using the given key using dot notation keys", () => {
  const minAmount = min(orders, "total.price");

  expect(minAmount).toEqual(150);
});

test("Min value of array of numbers", () => {
  const minValue = min([1, 2, 3, 4]);

  expect(minValue).toEqual(1);
});

test("Min value of Invalid key", () => {
  const minValue = min(orders, "customer");

  expect(minValue).toEqual(0);
});

// validation tests

test("Min value of non existing key", () => {
  const minValue = min(orders, "__NON__EXISTING__KEY__");

  expect(minValue).toEqual(0);
});

test("Min Value of invalid array", () => {
  const minValue = min(unknownValue(undefined), "__NON__EXISTING__KEY__");

  expect(minValue).toEqual(0);
});
// unknown
