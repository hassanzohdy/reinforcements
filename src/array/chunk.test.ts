import { orders } from "../../tests/data";
import { unknownValue } from "../../tests/utils";
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
  expect(chunk(unknownValue(12), 2).length).toEqual(0);
  expect(chunk(unknownValue(true), 2).length).toEqual(0);
  expect(chunk(unknownValue(false), 2).length).toEqual(0);
  expect(chunk(unknownValue(undefined), 2).length).toEqual(0);
  expect(chunk(unknownValue(null), 2).length).toEqual(0);
});
