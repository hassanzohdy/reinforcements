import only from "./only";

describe("reinforcements/object/only", () => {
  it("should return an object with only the given keys", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };
    const keys = ["a", "b"];
    const expected = {
      a: 1,
      b: 2,
    };
    const actual = only(object, keys);
    expect(actual).toEqual(expected);
  });

  it("should get nested keys from the object", () => {
    const object = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
      },
    };
    const keys = ["a", "c.d"];
    const expected = {
      a: 1,
      c: {
        d: 3,
      },
    };
    const actual = only(object, keys);

    expect(actual).toEqual(expected);
  });

  it("should return an empty object if no keys are given", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };
    const keys: Array<string> = [];
    const expected = {};
    const actual = only(object, keys);
    expect(actual).toEqual(expected);
  });
});
