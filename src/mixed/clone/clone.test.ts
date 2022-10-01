import clone from "./clone";

describe("reinforcements/mixed/clone", () => {
  it("should make a deep copy for the given object/array and its nested objects/arrays as well", () => {
    const object = { a: 1, b: { c: 2, d: 3 }, e: [4, 5, 6] };
    const array = [1, 2, 3, { a: 4, b: 5, c: [6, 7, 8] }];

    expect(clone(object)).toEqual(object);
    expect(clone(array)).toEqual(array);
  });

  it("should return the given value if it's not an object/array", () => {
    expect(clone(null)).toEqual(null);
    expect(clone(undefined)).toEqual(undefined);
    expect(clone("")).toEqual("");
    expect(clone(0)).toEqual(0);
    expect(clone(false)).toEqual(false);
    expect(clone(12)).toEqual(12);
  });

  it("should clone the object and keep its methods as well", () => {
    class Board {
      constructor(public name: string) {}

      getName() {
        return this.name;
      }
    }
    const object = {
      a: 1,
      board: new Board("Clone Board"),
    };

    expect(clone(object)).toEqual(object);
  });
});
