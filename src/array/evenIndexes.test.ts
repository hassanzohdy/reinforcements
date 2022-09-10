import { numbers } from "../../tests/data";
import { unknownValue } from "../../tests/utils";
import evenIndexes from "./evenIndexes";

test("Get elements of the array using even indexes", () => {
  const evenNumbers = evenIndexes(numbers);

  expect(new Set(evenNumbers)).toEqual(new Set([1, 3, 5, 7, 9]));
});

// validation tests

test("even Value of invalid array", () => {
  const evenArray = evenIndexes(unknownValue(undefined));

  expect(evenArray.length).toEqual(0);
});
// unknown
