import range from "./range";

describe("array/range", () => {
  it("should generate range of numbers", () => {
    expect(range(1, 3)).toEqual([1, 2, 3]);
  });

  it("should throw error if the given min value is not a number", () => {
    try {
      range(undefined as any, 4);
    } catch (error: any) {
      expect(error.message).toBe(
        `min parameter should be number, "undefined" given.`,
      );
    }
  });

  it("should throw error if the given min value equal or higher than the given max value", () => {
    try {
      range(4, 1);
    } catch (error: any) {
      expect(error.message).toBe(
        "max parameter should be higher than min parameter",
      );
    }
  });
});