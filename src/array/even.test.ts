import { numbers, orders } from "tests/data";
import { anyValue } from "tests/utils";
import even from "./even";

test("Get even values of the array", () => {
  const evenNumbers = even(numbers);

  expect(evenNumbers.length).toEqual(5);
});

test("Get even value of the array using the given key using dot notation keys", () => {
  const evenOrders = even(orders, "id");

  expect(evenOrders.length).toEqual(2);
});

test("even value of Invalid key", () => {
  const evenOrders = even(orders, "customer");

  expect(evenOrders.length).toEqual(0);
});

// validation tests

test("even value of non existing key", () => {
  const evenOrders = even(orders, "__NON__EXISTING__KEY__");

  expect(evenOrders.length).toEqual(0);
});

test("even Value of invalid array", () => {
  const evenOrders = even(anyValue(undefined), "__NON__EXISTING__KEY__");

  expect(evenOrders.length).toEqual(0);
});
// any
