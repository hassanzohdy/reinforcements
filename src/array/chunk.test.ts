import { orders } from "tests/data";
import { anyValue } from "tests/utils";
import chunk from "./chunk";

test("Chunk array by the given size", () => {
  const chunkedOrders = chunk(orders, 2);

  expect(chunkedOrders.length).toEqual(2);
  expect(chunk(orders, 1).length).toEqual(3);
});

test("Chunk string by the given size", () => {
  const chunkedString = chunk("hello", 2);

  expect(chunkedString.length).toEqual(3);
});

test("Invalid given value", () => {
  expect(chunk(anyValue(12), 2).length).toEqual(0);
  expect(chunk(anyValue(true), 2).length).toEqual(0);
  expect(chunk(anyValue(false), 2).length).toEqual(0);
  expect(chunk(anyValue(undefined), 2).length).toEqual(0);
  expect(chunk(anyValue(null), 2).length).toEqual(0);
});
