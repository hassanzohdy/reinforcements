import { anyValue } from "tests/utils";
import get from "./get";

describe("reinforcements/object/get", () => {
  it("should return the value of the given key", () => {
    const object = {
      a: {
        b: {
          c: 1,
        },
      },
    };
    expect(get(object, "a.b.c")).toBe(1);
  });

  it("should return undefined if the given key value is undefined", () => {
    const object = {
      a: {
        b: {
          c: undefined,
        },
      },
    };
    expect(get(object, "a.b.c")).toBe(undefined);
  });

  it("should return the default value if the key does not exist", () => {
    const object = {
      a: {
        b: {
          c: 1,
        },
      },
    };
    expect(get(object, "a.b.d", 4)).toBe(4);
  });

  it("should return default value if the given object is not an object", () => {
    expect(get(anyValue(null), "a.b.c", 2)).toBe(2);
    expect(get(anyValue(""), "a.b.c", 2)).toBe(2);
    expect(get(anyValue(false), "a.b.c", 2)).toBe(2);
    expect(get(anyValue(undefined), "a.b.c", 2)).toBe(2);
    expect(get(anyValue(undefined), "a.b.c")).toBe(undefined);
  });

  it("should return value from array using dot notation", () => {
    const object = {
      a: {
        b: {
          c: [
            {
              d: 1,
            },
          ],
        },
      },
    };

    expect(get(object, "a.b.c.0.d")).toBe(1);

    const data = [
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ];

    expect(get(data, "0.numbers.1")).toBe(2);
  });

  it("should return value from object even if value is a function", () => {
    const object = {
      a: {
        b: {
          c: () => 1,
        },
      },
    };

    expect(get(object, "a.b.c")).toBeInstanceOf(Function);
  });
});
