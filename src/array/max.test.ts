import { orders } from "tests/data";
import { anyValue } from "tests/utils";
import max from "./max";

test("Get max value of the array using the given key", () => {
  const maxAmount = max(orders, "amount");

  expect(maxAmount).toEqual(300);
});

test("Get max value of the array using the given key using dot notation keys", () => {
  const maxAmount = max(orders, "total.price");

  expect(maxAmount).toEqual(350);
});

test("max value of array of numbers", () => {
  const maxValue = max([1, 2, 3, 4]);

  expect(maxValue).toEqual(4);
});

test("max value of Invalid key", () => {
  const maxValue = max(orders, "customer");

  expect(maxValue).toEqual(0);
});

// validation tests

test("max value of non existing key", () => {
  const maxValue = max(orders, "__NON__EXISTING__KEY__");

  expect(maxValue).toEqual(0);
});

test("max Value of invalid array", () => {
  const maxValue = max(anyValue(undefined), "__NON__EXISTING__KEY__");

  expect(maxValue).toEqual(0);
});
// any
