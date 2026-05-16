import entries from "./entries";
import fromEntries from "./fromEntries";
import keys from "./keys";
import values from "./values";

describe("reinforcements/object/entries family", () => {
  it("entries returns [key, value] pairs", () => {
    expect(entries({ a: 1, b: 2 })).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });

  it("fromEntries inverts entries", () => {
    expect(fromEntries([["a", 1], ["b", 2]])).toEqual({ a: 1, b: 2 });
  });

  it("keys returns own enumerable keys", () => {
    expect(keys({ a: 1, b: 2 })).toEqual(["a", "b"]);
  });

  it("values returns own enumerable values", () => {
    expect(values({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});
