import { numbers } from "tests/data";
import { anyValue } from "tests/utils";
import oddIndexes from "./oddIndexes";

test("Get elements of the array using odd indexes", () => {
  const oddNumbers = oddIndexes(numbers);

  expect(new Set(oddNumbers)).toEqual(new Set([2, 4, 6, 8, 10]));
});

// validation tests

test("odd Value of invalid array", () => {
  const oddArray = oddIndexes(anyValue(undefined));

  expect(oddArray.length).toEqual(0);
});
// any
