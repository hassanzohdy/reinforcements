import { orders } from "../../../tests/data";
import { unknownValue } from "../../../tests/utils";
import sum from "./sum";

test("Sum value in the array using numbers", () => {
  const totalAmounts = sum(orders, "amount");

  expect(totalAmounts).toEqual(600);
});

test("Sum using dot notation keys", () => {
  const totalAmounts = sum(orders, "total.price");

  expect(totalAmounts).toEqual(750);
});

test("Sum not a number value", () => {
  const totalAmounts = sum(orders, "customer");

  expect(totalAmounts).toEqual(0);
});

test("Sum array of numbers", () => {
  const totalAmounts = sum([1, 2, 3, 4]);

  expect(totalAmounts).toEqual(10);
});

// validation tests

test("Sum non existing key", () => {
  const totalAmounts = sum(orders, "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});

test("Sum invalid array", () => {
  const totalAmounts = sum(unknownValue(undefined), "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});
// unknown
