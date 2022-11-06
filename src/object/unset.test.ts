import unset from "./unset";

describe("reinforcements/object/unset", () => {
  it("should remove the given keys from the given object", () => {
    const object = {
      name: "John",
      age: 22,
      email: "",
    };
    const keys = ["name", "email"];
    const expected = {
      age: 22,
    };
    const actual = unset(object, keys);
    expect(actual).toEqual(expected);
  });
  it("should remove the given keys using dot notation syntax", () => {
    const object = {
      name: "John",
      age: 22,
      email: "",
      address: {
        city: "London",
        country: "UK",
      },
    };
    const keys = ["name", "email", "address.city"];
    const expected = {
      age: 22,
      address: {
        country: "UK",
      },
    };
    const actual = unset(object, keys);
    expect(actual).toEqual(expected);
  });
  it("should return the given object if no keys are given", () => {
    const object = {
      name: "John",
      age: 22,
      email: "",
    };
    const keys: Array<string> = [];
    const expected = object;
    const actual = unset(object, keys);
    expect(actual).toEqual(expected);
  });
});
