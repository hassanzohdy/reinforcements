import except from "./except";

describe("reinforcements/object/except", () => {
  it("should return all except the given keys from the given object", () => {
    const object = {
      name: "John",
      age: 22,
      email: "",
    };
    const keys = ["name", "email"];

    const result = except(object, keys);

    expect(result).toEqual({
      age: 22,
    });
  });

  it("should return all except the given keys using dot notation syntax", () => {
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

    const result = except(object, keys);

    expect(result).toEqual({
      age: 22,
      address: {
        country: "UK",
      },
    });
  });

  it("should return same object if no keys are given", () => {
    const object = {
      name: "John",
      age: 22,
      email: "",
    };
    const keys: Array<string> = [];

    const result = except(object, keys);

    expect(result).toEqual(object);
  });
});
