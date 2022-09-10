import { numbers, orders } from "../../tests/data";
import { unknownValue } from "../../tests/utils";
import odd from "./odd";

test("Get odd values of the array", () => {
  const oddNumbers = odd(numbers);

  expect(oddNumbers.length).toEqual(5);
});

test("Get odd value of the array using the given key using dot notation keys", () => {
  const oddOrders = odd(orders, "id");

  expect(oddOrders.length).toEqual(2);
});

test("odd value of Invalid key", () => {
  const oddOrders = odd(orders, "customer");

  expect(oddOrders.length).toEqual(0);
});

// validation tests

test("odd value of non existing key", () => {
  const oddOrders = odd(orders, "__NON__EXISTING__KEY__");

  expect(oddOrders.length).toEqual(0);
});

test("odd Value of invalid array", () => {
  const oddOrders = odd(unknownValue(undefined), "__NON__EXISTING__KEY__");

  expect(oddOrders.length).toEqual(0);
});
// unknown
