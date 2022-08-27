import sum from "../../src/utilities/array/sum";

const orders = [
  {
    id: 1,
    customer: "A",
    amount: 100,
    taxes: 50,
    total: {
      price: 150,
    },
  },
  {
    id: 2,
    customer: "B",
    amount: 200,
    taxes: 50,
    total: {
      price: 250,
    },
  },
  {
    id: 3,
    customer: "A",
    amount: 300,
    taxes: 50,
    total: {
      price: 350,
    },
  },
];

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
  const totalAmounts = sum(undefined as any, "__NON__EXISTING__KEY__");

  expect(totalAmounts).toEqual(0);
});
// unknown
