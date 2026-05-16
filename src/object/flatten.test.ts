import flatten from "./flatten";

describe("reinforcements/object/flatten", () => {
  it("should return a flatten object with default dot separator", () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };

    expect(flatten(obj)).toEqual({
      a: 1,
      "b.c": 2,
      "b.d.e": 3,
    });
  });

  it("should return a flatten object with custom separator", () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };

    expect(flatten(obj, { separator: "/" })).toEqual({
      a: 1,
      "b/c": 2,
      "b/d/e": 3,
    });
  });

  it("should flatten arrays using numeric indices", () => {
    const data = [
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ];

    expect(flatten(data)).toEqual({
      "0.name": "Ahmed",
      "0.age": 20,
      "0.numbers.0": 1,
      "0.numbers.1": 2,
      "0.address.city": "Cairo",
      "1.name": "Ali",
      "1.age": 30,
      "1.numbers.0": 1,
      "1.numbers.1": 2,
    });
  });

  it("should preserve empty arrays as leaves", () => {
    expect(flatten({ tags: [], user: { roles: [] } })).toEqual({
      tags: [],
      "user.roles": [],
    });
  });

  it("should keep nested objects alongside flattened entries when keepNested is true", () => {
    const obj = { a: 1, b: { c: 2 } };

    expect(flatten(obj, { keepNested: true })).toEqual({
      a: 1,
      b: { c: 2 },
      "b.c": 2,
    });
  });

  it("should respect maxDepth", () => {
    const obj = { a: { b: { c: { d: 1 } } } };

    expect(flatten(obj, { maxDepth: 2 })).toEqual({
      "a.b": { c: { d: 1 } },
    });
  });

  it("should descend into class instances", () => {
    class User {
      constructor(public name: string, public age: number) {}
    }
    expect(flatten({ user: new User("Ahmed", 20) })).toEqual({
      "user.name": "Ahmed",
      "user.age": 20,
    });
  });

  it("should return the input value when given a non-object", () => {
    expect(flatten(null as any)).toEqual({});
    expect(flatten(42 as any)).toEqual({});
    expect(flatten("hello" as any)).toEqual({});
  });
});
