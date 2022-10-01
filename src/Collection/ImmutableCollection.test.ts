import { studentsClasses } from "tests/data";
import ImmutableCollection, { collect } from "./ImmutableCollection";

describe("reinforcements/ImmutableCollection/create", () => {
  it("should create collection from iterators", () => {
    const array = [1, 2, 3];

    expect(ImmutableCollection.fromIterator(array.values())).toEqual(
      collect(array),
    );
  });

  it("should create a new collection with the given length", () => {
    expect(ImmutableCollection.create(3)).toEqual(
      collect([undefined, undefined, undefined]),
    );

    expect(ImmutableCollection.create(3).length).toEqual(3);

    expect(ImmutableCollection.create(3, 1)).toEqual(collect([1, 1, 1]));
  });
});

describe("reinforcements/ImmutableCollection/equality", () => {
  it("should return a Collection instance", () => {
    expect(collect([])).toBeInstanceOf(ImmutableCollection);
  });

  it("should equal to the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.equals([1, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should equal to the given collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.equals(collect([1, 2, 3, 4, 5]))).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/filtration", () => {
  it("should filter the collection using where method", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "Ahmed").all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("should filter data where key is greater than the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", ">", 25).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);
    expect(collection.where("age", "gt", 25).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data where key is greater than or equal to the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", ">=", 25).all()).toEqual([
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);
    expect(collection.where("age", "gte", 25).all()).toEqual([
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data where key is less than the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "<", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
    ]);
    expect(collection.where("age", "lt", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
    ]);
  });

  it("should filter data where key is less than or equal to the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "<=", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
    expect(collection.where("age", "lte", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("should filter data where key is equal to the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", 25).all()).toEqual([
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.where("age", "=", 25).all()).toEqual([
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.where("age", "equals", 25).all()).toEqual([
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("should equal to the array or object", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ahmed", age: 25, numbers: [1, 3] },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ]);

    expect(collection.where("numbers", [1, 2]).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ]);

    expect(collection.where("address", { city: "Cairo" }).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
    ]);
  });

  it("should filter data where key is not equal to the given number", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "!=", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "not", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "not equals", 25).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should not equal to the array or object", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ahmed", age: 25, numbers: [1, 3] },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ]);

    expect(collection.where("numbers", "!=", [1, 2]).all()).toEqual([
      { name: "Ahmed", age: 25, numbers: [1, 3] },
    ]);

    expect(collection.where("address", "!=", { city: "Cairo" }).all()).toEqual([
      { name: "Ahmed", age: 25, numbers: [1, 3] },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ]);
  });

  it("should filter data that are like to the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "like", "ahm").all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.where("name", "%", "ahm").all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("should filter data that are not like to the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "not like", "ahm").all()).toEqual([
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "!%", "ahm").all()).toEqual([
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data that matches the given regular expression", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "regex", /Ahm/).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.where("name", /Ahm/).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("it should filter data that is included in the given array", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "in", ["Ahmed", "Ali"]).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("it should filter data that is not included in the given array", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "not in", ["Ahmed", "Ali"]).all()).toEqual(
      [],
    );

    expect(collection.where("name", "!in", ["Ahmed", "Ali"]).all()).toEqual([]);
  });

  it("should filter data between the given two values", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "between", [20, 25]).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.where("age", "<>", [20, 25]).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);

    expect(collection.whereBetween("age", [20, 25]).all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
    ]);
  });

  it("should filter data not between the given two values", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "not between", [20, 25]).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "!between", [20, 25]).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "!<>", [20, 25]).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);

    expect(collection.whereNotBetween("age", [20, 25]).all()).toEqual([
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data that its type is the same as the given type", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "is", "number").all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "typeof", "number").all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "is", "string").all()).toEqual([
      { name: "Ahmed", age: "25" },
    ]);
  });

  it("should filter data that its type is not the same as the given type", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("age", "is not", "number").all()).toEqual([
      { name: "Ahmed", age: "25" },
    ]);
    expect(collection.where("age", "!is", "number").all()).toEqual([
      { name: "Ahmed", age: "25" },
    ]);

    expect(collection.where("age", "not typeof", "number").all()).toEqual([
      { name: "Ahmed", age: "25" },
    ]);
  });

  it("should filter data that the given key should be an instance of the given constructor", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(
      collection.where("numbers", "is a", ImmutableCollection).all(),
    ).toEqual([{ name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) }]);
    expect(
      collection.where("numbers", "instanceof", ImmutableCollection).all(),
    ).toEqual([{ name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) }]);
  });

  it("should filter data that the given key should not be an instance of the given constructor", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(
      collection.where("numbers", "is not a", ImmutableCollection).all(),
    ).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(
      collection.where("numbers", "not instanceof", ImmutableCollection).all(),
    ).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(
      collection.where("numbers", "!is a", ImmutableCollection).all(),
    ).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(
      collection.where("numbers", "!instanceof", ImmutableCollection).all(),
    ).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data that the given key exists", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("numbers", "exists").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
    ]);

    expect(collection.whereExists("numbers").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
    ]);
  });

  it("should filter data that the given key does not exist", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: collect([1, 2, 3]) },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("numbers", "!exists").all()).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("numbers", "not exists").all()).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.whereNotExists("numbers").all()).toEqual([
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should filter data that the key contains the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25" },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "contains", "Al").all()).toEqual([
      { name: "Ali", age: 30 },
    ]);

    expect(collection.where("name", "contains", "Ahm").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25" },
    ]);
  });

  it("should filter data that the key does not contain the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("numbers", "not contains", 5).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);

    expect(collection.where("name", "not contains", "Al").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);

    expect(collection.where("name", "!contains", "Ahm").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);
  });

  it("should filter data that the given key starts with the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "starts with", "Ah").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);

    expect(collection.where("name", "starts with", "Al").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);
  });

  it("should filter data that the given key does not start with the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "not starts with", "Ah").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "!starts with", "Al").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);
  });

  it("should filter data that the given key ends with the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "ends with", "med").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);

    expect(collection.where("name", "ends with", "li").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);
  });

  it("should filter data that the given key does not end with the given string", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "not ends with", "med").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("name", "!ends with", "li").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
    ]);
  });

  it("should filter data that is not empty", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.where("numbers", "is not empty").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.where("numbers", "!empty").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);

    expect(collection.whereNotEmpty("numbers").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
    ]);
  });

  it("should filter data that is empty", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.where("numbers", "is empty").all()).toEqual([
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.where("numbers", "empty").all()).toEqual([
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.whereEmpty("numbers").all()).toEqual([
      { name: "Ali", age: 30, numbers: [] },
    ]);
  });

  it('should filter data that the given key is "null"', () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
      { name: "Ali", age: null, numbers: [] },
    ]);

    expect(collection.where("age", null).all()).toEqual([
      { name: "Ali", age: null, numbers: [] },
    ]);

    expect(collection.where("age", "null").all()).toEqual([
      { name: "Ali", age: null, numbers: [] },
    ]);

    expect(collection.where("age", "is null").all()).toEqual([
      { name: "Ali", age: null, numbers: [] },
    ]);

    expect(collection.whereNull("age").all()).toEqual([
      { name: "Ali", age: null, numbers: [] },
    ]);
  });

  it('should filter data that the given key is not "null"', () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
      { name: "Ali", age: null, numbers: [] },
    ]);

    expect(collection.where("age", "is not null").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.where("age", "!null").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.where("age", "is not null").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);

    expect(collection.whereNotNull("age").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3] },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4] },
      { name: "Ali", age: 30, numbers: [5, 6] },
      { name: "Ali", age: 30, numbers: [] },
    ]);
  });

  it("should filter data where the given key is true", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", true).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);

    expect(collection.where("is_admin", "true").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);

    expect(collection.where("is_admin", "is true").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);
  });

  it("should filter data where the given key is not true", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "!true").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "is not true").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);
  });

  it("should filter data where the given key is false", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", false).all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "false").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "is false").all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);
  });

  it("should filter data where the given key is not false", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "!false").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);

    expect(collection.where("is_admin", "is not false").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);
  });

  it("should filter the data that the given key is undefined", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("is_admin", undefined).all()).toEqual([
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("is_admin", "undefined").all()).toEqual([
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("is_admin", "is undefined").all()).toEqual([
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);
  });

  it("should filter the data that the given key is not undefined", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("is_admin", "!undefined").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", "is not undefined").all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: false },
    ]);
  });

  it("should filter data with primitive values", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: null },
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("age", 20).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
    ]);

    expect(collection.where("name", "Hasan").all()).toEqual([
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.where("is_admin", true).all()).toEqual([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
    ]);

    expect(collection.where("is_admin", false).all()).toEqual([
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
    ]);

    expect(collection.where("is_admin", null).all()).toEqual([
      { name: "Ali", age: null, numbers: [], is_admin: null },
    ]);

    expect(collection.where("is_admin", undefined).all()).toEqual([
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);
  });

  it("should return first filtered data using firstWhere", () => {
    const collection = collect([
      { name: "Ahmed", age: 20, numbers: [1, 2, 3], is_admin: true },
      { name: "Ahmed", age: "25", numbers: [2, 3, 4], is_admin: true },
      { name: "Ali", age: 30, numbers: [5, 6], is_admin: false },
      { name: "Ali", age: 30, numbers: [], is_admin: false },
      { name: "Ali", age: null, numbers: [], is_admin: null },
      { name: "Hasan", age: null, numbers: [], is_admin: undefined },
    ]);

    expect(collection.firstWhere("age", 20)).toEqual({
      name: "Ahmed",
      age: 20,
      numbers: [1, 2, 3],
      is_admin: true,
    });
    expect(collection.firstWhere("name", "Hasan")).toEqual({
      name: "Hasan",
      age: null,
      numbers: [],
      is_admin: undefined,
    });
    expect(collection.firstWhere("is_admin", true)).toEqual({
      name: "Ahmed",
      age: 20,
      numbers: [1, 2, 3],
      is_admin: true,
    });
    expect(collection.firstWhere("is_admin", false)).toEqual({
      name: "Ali",
      age: 30,
      numbers: [5, 6],
      is_admin: false,
    });
    expect(collection.firstWhere("is_admin", null)).toEqual({
      name: "Ali",
      age: null,
      numbers: [],
      is_admin: null,
    });
    expect(collection.firstWhere("is_admin", undefined)).toEqual({
      name: "Hasan",
      age: null,
      numbers: [],
      is_admin: undefined,
    });
  });
});

describe("reinforcements/ImmutableCollection/sorting", () => {
  it("should sort the collection", () => {
    const collection = collect([5, 3, 1, 2, 4]);

    expect(collection.sort().all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should sort the collection with a custom callback", () => {
    const collection = collect([5, 3, 1, 2, 4]);

    expect(
      collection
        .sort((a, b) => {
          if (a > b) {
            return -1;
          }

          if (a < b) {
            return 1;
          }

          return 0;
        })
        .all(),
    ).toEqual([5, 4, 3, 2, 1]);
  });

  it("should sort the collection by the given key in asc order", () => {
    const collection = collect([
      { name: "Jane", age: 25 },
      { name: "Jack", age: 30 },
      { name: "John", age: 20 },
    ]);

    expect(collection.sortBy("age").all()).toEqual([
      { name: "John", age: 20 },
      { name: "Jane", age: 25 },
      { name: "Jack", age: 30 },
    ]);
  });

  it("should sort the collection by the given key in desc order", () => {
    const collection = collect([
      { name: "Jane", age: 25 },
      { name: "Jack", age: 30 },
      { name: "John", age: 20 },
    ]);

    expect(collection.sortByDesc("age").all()).toEqual([
      { name: "Jack", age: 30 },
      { name: "Jane", age: 25 },
      { name: "John", age: 20 },
    ]);
  });

  it("should sort the collection by the given list of keys", () => {
    const collection = collect([
      { name: "Jane", age: 25 },
      { name: "Jack", age: 30 },
      { name: "Ali", age: 20 },
      { name: "Hasan", age: 20 },
      { name: "Hasan", age: 19 },
    ]);

    expect(
      collection
        .sortBy({
          age: "asc",
          name: "asc",
        })
        .all(),
    ).toEqual([
      { name: "Hasan", age: 19 },
      { name: "Ali", age: 20 },
      { name: "Hasan", age: 20 },
      { name: "Jane", age: 25 },
      { name: "Jack", age: 30 },
    ]);
  });
});
describe("reinforcements/ImmutableCollection/operations", () => {
  it("should perform the given callback over each element in the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    const spy = jest.fn();

    collection.forEach(spy);

    expect(spy).toHaveBeenCalledTimes(5);
  });
  it("should perform the given callback over each element in the collection using each method", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    const spy = jest.fn();

    collection.each(spy);

    expect(spy).toHaveBeenCalledTimes(5);
  });

  it("should perform the given callback over each element in the collection using tap method", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    const spy = jest.fn();

    collection.tap(spy);

    expect(spy).toHaveBeenCalledTimes(5);
  });
});
describe("reinforcements/ImmutableCollection/filtering", () => {
  it("should reject first matched item with the given callback using rejectFirst", () => {
    const collection = collect([1, 2, 3, 4, 5, 3, 5]);

    expect(collection.rejectFirst(item => item === 3).all()).toEqual([
      1, 2, 4, 5, 3, 5,
    ]);
  });
  it("should reject first matched item with the given callback using exceptFirst", () => {
    const collection = collect([1, 2, 3, 4, 5, 3, 5]);

    expect(collection.exceptFirst(item => item === 3).all()).toEqual([
      1, 2, 4, 5, 3, 5,
    ]);
  });

  it("should reject all matched items with the given callback using reject", () => {
    const collection = collect([1, 2, 3, 4, 5, 3, 5]);

    expect(collection.reject(item => item === 3).all()).toEqual([
      1, 2, 4, 5, 5,
    ]);
  });

  it("should reject all matched items with the given callback using except", () => {
    const collection = collect([1, 2, 3, 4, 5, 3, 5]);

    expect(collection.except(item => item === 3).all()).toEqual([
      1, 2, 4, 5, 5,
    ]);
  });

  it("should return all items that its value does not match the given value using not method", () => {
    const collection = collect([1, 2, 3, 4, 5, 3, 5]);

    expect(collection.not(3).all()).toEqual([1, 2, 4, 5, 5]);
  });
});

describe("reinforcements/ImmutableCollection/slicing", () => {
  it("should take the first 2 items using skip", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.take(2).equals([1, 2])).toBeTruthy();
  });

  it("should take the first 2 items using limit", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.limit(2).equals([1, 2])).toBeTruthy();
  });

  it("should take the last 2 items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.takeLast(2).equals([4, 5])).toBeTruthy();
  });

  it("should take items until matches the given callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.takeUntil(item => item === 3).equals([1, 2]),
    ).toBeTruthy();
  });

  it("should take items while matches the given callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.takeWhile(item => item < 3).equals([1, 2])).toBeTruthy();
  });

  it("should skip the given number of items using skip", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.skip(2).equals([3, 4, 5])).toBeTruthy();
  });

  it("should skip the given number of items using skipTo", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.skipTo(3).all()).toEqual([4, 5]);
  });

  it("should skip the given number of items using skipFirst", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.skipFirst(3).equals([4, 5])).toBeTruthy();
  });

  it("should skip last the given number of items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.skipLast(2).equals([1, 2, 3])).toBeTruthy();
  });

  it("should skip items until matches the given callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.skipUntil(item => item === 3).equals([3, 4, 5]),
    ).toBeTruthy();
  });

  it("should skip last items until matches the given callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.skipLastUntil(item => item === 3).all()).toEqual([1, 2]);
  });

  it("should skip items while matches the given callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.skipWhile(item => item < 3).equals([3, 4, 5]),
    ).toBeTruthy();
  });

  it("should slice the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.slice(1, 3).equals([2, 3])).toBeTruthy();
  });

  it("should slice the collection from the given start index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.slice(3).equals([4, 5])).toBeTruthy();
  });

  it("should slice the collection to the given end index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.slice(0, 3).equals([1, 2, 3])).toBeTruthy();
  });

  it("should splice the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.splice(1, 2).all()).toEqual([1, 4, 5]);
  });
});
describe("reinforcements/ImmutableCollection/random", () => {
  it("should return a random item from the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.random()).toBeGreaterThanOrEqual(1);
    expect(collection.random()).toBeLessThanOrEqual(5);
  });

  it("should shuffle the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.shuffle()).not.toEqual([1, 2, 3, 4, 5]);
  });
});
describe("reinforcements/ImmutableCollection/boolean", () => {
  it("should check if the array contains the given value using includes method", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.includes(1)).toBeTruthy();
  });

  it("should check if the array contains the given value using contains method", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.contains(1)).toBeTruthy();
  });

  it("should check if the array contains the given value using callback", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.has(item => item === 1)).toBeTruthy();
  });

  it("should check if array is empty", () => {
    expect(collect([]).isEmpty()).toBeTruthy();

    expect(collect([1, 2, 3, 4, 5]).isEmpty()).toBeFalsy();
  });

  it("should check if array is not empty", () => {
    expect(collect([]).isNotEmpty()).toBeFalsy();

    expect(collect([1, 2, 3, 4, 5]).isNotEmpty()).toBeTruthy();
  });
});
describe("reinforcements/ImmutableCollection/insert", () => {
  it("should add the given value to beginning of the collection using prepend", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.prepend(0).equals([0, 1, 2, 3, 4, 5])).toBeTruthy();
  });
  it("should add the given value to beginning of the collection using unshift", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.unshift(0).equals([0, 1, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should add the given value to end of the collection using append", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.append(6).equals([1, 2, 3, 4, 5, 6])).toBeTruthy();
  });

  it("should add the given value to end of the collection using push", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.push(6).equals([1, 2, 3, 4, 5, 6])).toBeTruthy();
  });

  it("should add the only the unique values to the beginning of the collection using pushUnique", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.prependUnique(6, 4, 5, 1).equals([1, 2, 3, 4, 5, 6]),
    ).toBeTruthy();
  });

  it("should add the only the unique values to the end of the collection using pushUnique", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.pushUnique(6, 4, 5, 1).equals([1, 2, 3, 4, 5, 6]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/update", () => {
  it("should update the value of the given index with a new value using update", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.update(0, 10).equals([10, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should update the value of the given index with a new value using set", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.set(4, 10).equals([1, 2, 3, 4, 10])).toBeTruthy();
  });

  it("should replace the given old value with the new value", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.replace(1, 10).equals([10, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should replace all the old values with the given value", () => {
    const collection = collect([1, 2, 1, 3, 4, 1, 5]);

    expect(
      collection.replaceAll(1, 10).equals([10, 2, 10, 3, 4, 10, 5]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/deleteByIndex", () => {
  it("should delete the element of the given index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.delete(0).equals([2, 3, 4, 5])).toBeTruthy();
  });

  it("should delete the given indexes from the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.unset(0, 2, 4).equals([2, 4])).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/deleteByValue", () => {
  it("should delete first matched value with the callback from the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.remove(value => value === 1).equals([2, 3, 4, 5]),
    ).toBeTruthy();
  });

  it("should return the first value from the collection and remove it as well", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.shift()).toEqual(1);

    expect(collection.equals([2, 3, 4, 5])).toBeTruthy();
  });

  it("should return the last value from the collection and remove it as well", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.pop()).toEqual(5);

    expect(collection.equals([1, 2, 3, 4])).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/merge", () => {
  it("should merge with the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection
        .merge([6, 7, 8, 9, 10])
        .equals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ).toBeTruthy();
  });

  it("should concat the given array to the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection
        .concat([6, 7, 8, 9, 10])
        .equals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/indexes", () => {
  it("should return the items length", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.length).toBe(5);
  });

  it("should return the indexes of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.indexes().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return the keys (indexes) as list of strings of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.keys().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return last index of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.lastIndex()).toBe(4);
  });

  it("should return the value at the given index using at", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.at(2)).toBe(3);
  });

  it("should return the value at the given index using index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.index(2)).toBe(3);
  });
});

describe("reinforcements/ImmutableCollection/string", () => {
  it("should append the given string to each collection item", () => {
    const collection = collect(["Ahmed", "Mohamed", "Ali"]);

    expect(collection.appendString(" Mohamed").all()).toEqual([
      "Ahmed Mohamed",
      "Mohamed Mohamed",
      "Ali Mohamed",
    ]);
  });

  it("should append the given string to the given key of each collection item", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.appendString(" Mohamed", "name").all()).toEqual([
      { name: "Ahmed Mohamed", age: 20 },
      { name: "Mohamed Mohamed", age: 25 },
      { name: "Ali Mohamed", age: 30 },
    ]);
  });

  it("should prepend the given string to each collection item", () => {
    const collection = collect(["Ahmed", "Mohamed", "Ali"]);

    expect(collection.prependString("Mohamed ").all()).toEqual([
      "Mohamed Ahmed",
      "Mohamed Mohamed",
      "Mohamed Ali",
    ]);
  });

  it("should prepend the given string to the given key of each collection item", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.prependString("Mohamed ", "name").all()).toEqual([
      { name: "Mohamed Ahmed", age: 20 },
      { name: "Mohamed Mohamed", age: 25 },
      { name: "Mohamed Ali", age: 30 },
    ]);
  });

  it("should convert array into string", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.toString()).toBe("1,2,3,4,5");
  });
});

describe("reinforcements/ImmutableCollection/getSingleValue", () => {
  it("should return the first value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.first()).toBe(1);
  });

  it("should return null for the first value from empty collection", () => {
    const collection = collect([]);

    expect(collection.first()).toBe(null);
  });

  it("should return the last value of the collection using last", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.last()).toBe(5);
  });

  it("should return the last value of the collection using end", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.end()).toBe(5);
  });

  it("should return the value of the given index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.index(0)).toBe(1);
  });

  it("should return the value of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.value("name")).toBe("Ahmed");
  });

  it("should return default value if the given key doesn't exist", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.value("nameS", "default")).toBe("default");
  });

  it("should return the value of the given key of the given index", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.valueAt(1, "name")).toBe("Mohamed");
  });

  it("should return default value if the given key of the given index doesn't exist", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.valueAt(1, "nameS", "default")).toBe("default");
  });

  it("should return the last item that has the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.lastValue("name")).toBe("Ali");
  });

  it("should return default value if the last item that has the given key doesn't exist", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.lastValue("nameS", "default")).toBe("default");
  });
});

describe("reinforcements/ImmutableCollection/listings", () => {
  it("should return return values that are in the odd indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).oddIndexes();

    expect(collection.all()).toEqual([2, 4, 6]);
  });

  it("should return return values that are in the even indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).evenIndexes();

    expect(collection.all()).toEqual([1, 3, 5, 7]);
  });

  it("should return return values that are in the given indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).only(0, 2, 4);

    expect(collection.all()).toEqual([1, 3, 5]);
  });

  it("should return return values that are not in the given indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).exceptIndexes(0, 2, 4);

    expect(collection.all()).toEqual([2, 4, 6, 7]);
  });

  it("should return even values", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).even();

    expect(collection.all()).toEqual([2, 4, 6]);
  });
  it("should return even values of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).even("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should return odd values", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).odd();

    expect(collection.all()).toEqual([1, 3, 5, 7]);
  });

  it("should return odd values of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).odd("age");

    expect(collection.all()).toEqual([{ name: "Mohamed", age: 25 }]);
  });

  it("should return unique values", () => {
    const collection = collect([
      1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,
    ]).unique();

    expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should return unique values of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).unique("age");

    expect(collection.all()).toEqual([20, 25, 30]);
  });

  it("should return unique lists of the given key to return first matched value of each type", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).uniqueList("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should reverse the collection using reverse method", () => {
    const collection = collect([1, 2, 3, 4, 5]).reverse();

    expect(collection.all()).toEqual([5, 4, 3, 2, 1]);
  });

  it("should reverse the collection using flip method", () => {
    const collection = collect([1, 2, 3, 4, 5]).flip();

    expect(collection.all()).toEqual([5, 4, 3, 2, 1]);
  });

  it("should return a copy of the collection using clone", () => {
    const collection = collect([1, 2, 3, 4, 5]).clone();

    expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return a copy of the collection using copy", () => {
    const collection = collect([1, 2, 3, 4, 5]).copy();

    expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should group by the data by the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Hasan", age: 30 },
    ]).groupBy("age");

    expect(collection.all()).toEqual([
      {
        age: 20,
        items: [{ name: "Ahmed", age: 20 }],
      },
      {
        age: 25,
        items: [{ name: "Mohamed", age: 25 }],
      },
      {
        age: 30,
        items: [
          { name: "Ali", age: 30 },
          { name: "Hasan", age: 30 },
        ],
      },
    ]);
  });

  it("It should pluck the given key and return a new collection with the plucked values", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Hasan", age: 30 },
    ]).pluck("name");

    expect(collection.all()).toEqual(["Ahmed", "Mohamed", "Ali", "Hasan"]);
  });

  it("It should pluck the given keys and return a new collection with the plucked values", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Hasan", age: 30 },
    ]).pluck(["name", "age"]);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Hasan", age: 30 },
    ]);
  });

  it("should create a new collection from the given key from the first element", () => {
    const collection = collect([
      {
        id: 1,
        data: ["Hasan", "Ali", "Mohamed"],
      },
    ]).collectFromFirst("data");

    expect(collection.all()).toEqual(["Hasan", "Ali", "Mohamed"]);
  });

  it("should create a new collection from the given key from the given element index", () => {
    const collection = collect([
      {
        id: 1,
        data: ["Hasan", "Ali", "Mohamed"],
      },
      {
        id: 2,
        data: ["Ahmed", "Sayed", "Khaled"],
      },
      {
        id: 3,
        data: ["Hassan", "Zohdy", "Hassan"],
      },
    ]).collectFrom(2, "data");

    expect(collection.all()).toEqual(["Hassan", "Zohdy", "Hassan"]);
  });

  it("should create a new collection from the given key which can combine the index and the key as well in one argument", () => {
    const collection = collect([
      {
        id: 1,
        data: ["Hasan", "Ali", "Mohamed"],
      },
      {
        id: 2,
        data: ["Ahmed", "Sayed", "Khaled"],
      },
      {
        id: 3,
        data: ["Hassan", "Zohdy", "Hassan"],
      },
    ]).collectFrom("2.data");

    expect(collection.all()).toEqual(["Hassan", "Zohdy", "Hassan"]);
  });

  it("should group by the data by the given key and set the list as key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
      { name: "Hasan", age: 30 },
    ]).groupBy("age", "data");

    expect(collection.all()).toEqual([
      {
        age: 20,
        data: [{ name: "Ahmed", age: 20 }],
      },
      {
        age: 25,
        data: [{ name: "Mohamed", age: 25 }],
      },
      {
        age: 30,
        data: [
          { name: "Ali", age: 30 },
          { name: "Hasan", age: 30 },
        ],
      },
    ]);
  });

  it("should group by multiple keys", () => {
    const collection = collect(studentsClasses).groupBy(["class", "grade"]);

    expect(collection.all()).toEqual([
      {
        class: "A",
        grade: 1,
        items: [
          {
            id: 1,
            class: "A",
            grade: 1,
          },
        ],
      },
      {
        class: "B",
        grade: 2,
        items: [
          {
            id: 2,
            class: "B",
            grade: 2,
          },
          {
            id: 4,
            class: "B",
            grade: 2,
          },
          {
            id: 5,
            class: "B",
            grade: 2,
          },
        ],
      },
      {
        class: "A",
        grade: 3,
        items: [
          {
            id: 3,
            class: "A",
            grade: 3,
          },
        ],
      },
      {
        class: "C",
        grade: 5,
        items: [
          {
            id: 6,
            class: "C",
            grade: 5,
          },
        ],
      },
    ]);
  });

  it("should chunk the collection into the given number of groups", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7, 8]).chunk(4);

    expect(collection.all()).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });

  it("should return the array list from the collection using toArray", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7, 8]).toArray();

    expect(collection).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should return the array list from the collection using all", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7, 8]).all();

    expect(collection).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should return the array list using toArray but to map over the values", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7, 8]).toArray(
      value => value * 2,
    );

    expect(collection).toEqual([2, 4, 6, 8, 10, 12, 14, 16]);
  });
});

describe("reinforcements/ImmutableCollection/original", () => {
  // Original Array Methods tests
  it("should return map over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.map(item => item * 2).all()).toEqual([2, 4, 6, 8, 10]);
  });

  it("should return filter over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.filter(item => item % 2 === 0).all()).toEqual([2, 4]);
  });

  it("should return reduce over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.reduce((acc, item) => acc + item, 0)).toBe(15);
  });

  it("should return reduceRight over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.reduceRight((acc, item) => acc + item, 0)).toBe(15);
  });

  it("should return forEach over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);
    const spy = jest.fn();

    collection.forEach(spy);

    expect(spy).toHaveBeenCalledTimes(5);
  });

  it("should return every over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.every(item => item > 0)).toBeTruthy();
  });

  it("should return some over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.some(item => item > 0)).toBeTruthy();
  });

  it("should return find over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.find(item => item > 3)).toBe(4);
  });

  it("should return findIndex over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.findIndex(item => item > 3)).toBe(3);
  });

  it("should return includes over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.includes(3)).toBeTruthy();
  });

  it("should return indexOf over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.indexOf(3)).toBe(2);
  });

  it("should return lastIndexOf over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.lastIndexOf(3)).toBe(2);
  });

  it("should return join over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.join(",")).toBe("1,2,3,4,5");
  });

  it("should return keys over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.keys().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return values over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.values().all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return entries over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.entries().all()).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ]);
  });

  it("should return flat over the collection items", () => {
    const collection = collect([1, [2, 3], [4, 5]]);

    expect(collection.flat().all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return flatMap over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.flatMap(item => [item, item * 2]).all()).toEqual([
      1, 2, 2, 4, 3, 6, 4, 8, 5, 10,
    ]);
  });

  it("should concat the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.concat([6, 7, 8]).all()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });
});

describe("reinforcements/ImmutableCollection/reordering", () => {
  it("should swap between two indexes", () => {
    const collection = collect([1, 2, 3, 4, 5]).swap(0, 4);

    expect(collection.all()).toEqual([5, 2, 3, 4, 1]);
  });

  it("should move the given index into the given position", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).move(2, 4);

    expect(collection.all()).toEqual([1, 2, 4, 5, 3, 6, 7]);
  });

  it("should reorder the indexes based on the given indexes object map", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).reorder({
      0: 3,
      1: 4,
      2: 5,
      3: 6,
      4: 0,
      5: 1,
      6: 2,
    });

    expect(collection.all()).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });
});
describe("reinforcements/ImmutableCollection/math", () => {
  it("should return min value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.min()).toBe(1);
  });

  it("should return min value of the given key of the collection", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.min("age")).toBe(20);
  });

  it("should return max value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.max()).toBe(5);
  });

  it("should return max value of the given key of the collection", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.max("age")).toBe(30);
  });

  it("should sum the total amount of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.sum()).toBe(15);
  });

  it("should sum the total amount of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.sum("age")).toBe(75);
  });

  it("should return the average of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.average()).toBe(3);
  });

  it("should return the average of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.average("age")).toBe(25);
  });

  it("should return the median of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.median()).toBe(3);
  });

  it("should return the median of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.median("age")).toBe(25);
  });

  it("should plus the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).plus(1);

    expect(collection.all()).toEqual([2, 3, 4, 5, 6]);
  });

  it("should plus the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).plus("age", 1);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 21 },
      { name: "Mohamed", age: 26 },
      { name: "Ali", age: 31 },
    ]);
  });

  it("should increment each item in the collection by one", () => {
    const collection = collect([1, 2, 3, 4, 5]).increment();

    expect(collection.all()).toEqual([2, 3, 4, 5, 6]);
  });

  it("should increment the given key of each item in the collection by the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).increment("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 21 },
      { name: "Mohamed", age: 26 },
      { name: "Ali", age: 31 },
    ]);
  });

  it("should minus the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).minus(1);

    expect(collection.all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should minus the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).minus("age", 1);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 19 },
      { name: "Mohamed", age: 24 },
      { name: "Ali", age: 29 },
    ]);
  });

  it("should decrement each item in the collection by one", () => {
    const collection = collect([1, 2, 3, 4, 5]).decrement();

    expect(collection.all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should decrement the given key of each item in the collection by the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).decrement("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 19 },
      { name: "Mohamed", age: 24 },
      { name: "Ali", age: 29 },
    ]);
  });

  it("should multiply the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).multiply(2);

    expect(collection.all()).toEqual([2, 4, 6, 8, 10]);
  });

  it("should multiply the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).multiply("age", 2);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 40 },
      { name: "Mohamed", age: 50 },
      { name: "Ali", age: 60 },
    ]);
  });

  it("should divide the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).divide(2);

    expect(collection.all()).toEqual([0.5, 1, 1.5, 2, 2.5]);
  });

  it("should divide the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).divide("age", 2);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 10 },
      { name: "Mohamed", age: 12.5 },
      { name: "Ali", age: 15 },
    ]);
  });

  it("should not divide by zero and throw an error", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(() => collection.divide(0)).toThrowError("Cannot divide by zero");
  });

  it("should not divide by zero and throw an error", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(() => collection.divide("age", 0)).toThrowError(
      "Cannot divide by zero",
    );
  });

  it("should count the occurrences of values for the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.count("age")).toEqual(3);
  });

  it("should count the occurrences of values for the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Ahmed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.countBy("name")).toEqual({
      Ahmed: 2,
      Ali: 1,
    });
  });
});

describe("reinforcements/ImmutableCollection/iterating", () => {
  it("should loop over the collection using for-of", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]);

    for (const value of collection) {
      expect(typeof value).toBe("number");
    }
  });
});
