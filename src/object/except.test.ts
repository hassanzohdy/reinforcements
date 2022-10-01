import except from "./except";

describe("reinforcements/object", () => {
  it("should return only the given keys from the given object", () => {
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
});
