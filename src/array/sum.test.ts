import { numbers, orders } from "tests/data";
import { anyValue } from "tests/utils";
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
  const totalAmounts = sum(numbers);

  expect(totalAmounts).toEqual(55);
});

// validation tests

test("Sum non existing key", () => {
  const totalAmounts = sum(orders, "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});

test("Sum invalid array", () => {
  const totalAmounts = sum(anyValue(undefined), "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});

test("Mixed array data", () => {
  const totalAmounts = sum([
    1,
    2,
    "3", // invalid
    4,
    5,
    true, // invalid
    "6", // invalid
    7,
    8,
    "9", // invalid
    10,
    "Invalid String", // invalid
  ]);

  expect(totalAmounts).toEqual(37);
});
