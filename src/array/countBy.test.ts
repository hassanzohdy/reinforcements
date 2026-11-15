import countBy from "./countBy";

describe("reinforcements/countBy", () => {
  it("should count the occurrences of values in an array for the given key", () => {
    const array = [
      { id: 1, animal: "dog" },
      { id: 2, animal: "cat" },
      { id: 3, animal: "dog" },
      { id: 4, animal: "cat" },
      { id: 5, animal: "dog" },
    ];

    expect(countBy(array, "animal")).toEqual({
      dog: 3,
      cat: 2,
    });
  });

  it("should return an empty object if the given array is not an array", () => {
    expect(countBy(null as any, "animal")).toEqual({});
  });

  it("counts __proto__ and inherited names as ordinary keys", () => {
    const result: any = countBy(
      [{ a: "__proto__" }, { a: "constructor" }, { a: "constructor" }],
      "a",
    );

    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.keys(result)).toEqual(["__proto__", "constructor"]);
    expect(Object.getOwnPropertyDescriptor(result, "__proto__")?.value).toBe(1);
    expect(result.constructor).toBe(2);
  });
});
