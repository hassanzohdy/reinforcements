import { orders } from "tests/data";
import { anyValue } from "tests/utils";
import average from "./average";

test("Average amount in the array using numbers", () => {
  const totalAmounts = average(orders, "amount");

  expect(totalAmounts).toEqual(200);
});

test("average using dot notation keys", () => {
  const totalAmounts = average(orders, "total.price");

  expect(totalAmounts).toEqual(250);
});

test("Average not a number value", () => {
  const totalAmounts = average(orders, "customer");

  expect(totalAmounts).toEqual(0);
});

test("Average array of numbers", () => {
  const totalAmounts = average([1, 2, 3, 4]);

  expect(totalAmounts).toEqual(2.5);
});

// validation tests

test("Average non existing key", () => {
  const totalAmounts = average(orders, "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});

test("Average invalid array", () => {
  expect(average(anyValue(undefined), "__NON__EXISTING__KEY__")).toEqual(0);
  expect(average(anyValue(true), "__NON__EXISTING__KEY__")).toEqual(0);
  expect(average(anyValue(false), "__NON__EXISTING__KEY__")).toEqual(0);
  expect(average(anyValue(""), "__NON__EXISTING__KEY__")).toEqual(0);
  expect(average(anyValue(1), "__NON__EXISTING__KEY__")).toEqual(0);
  expect(average(anyValue(1.5), "__NON__EXISTING__KEY__")).toEqual(0);
});
// any
