import initials from "./initials";

describe("Name Initials", () => {
  it("should return the initials of a name", () => {
    expect(initials("John Doe")).toBe("JD");
    expect(initials("John Doe", ".")).toBe("J.D");
  });

  it("should return an empty string if the name is empty", () => {
    expect(initials("")).toBe("");
  });

  it("should throw an error if the name is not a string", () => {
    expect(() => initials(123 as any)).toThrowError(
      "The name must be a string",
    );
  });
});
