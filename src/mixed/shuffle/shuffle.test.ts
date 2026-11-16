import { anyValue } from "tests/utils";
import shuffle from "./shuffle";
import { cryptoRef } from "../../Random/_internal";

describe("reinforcements/mixed/shuffle", () => {
  it("should shuffle the given array", () => {
    expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it("should return the given array if it's empty", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("should return shuffled string characters if it's a string", () => {
    const newShuffledString = shuffle("test");

    expect(typeof newShuffledString).toBe("string");
  });

  it("should return same value if it's not an array or string", () => {
    expect(shuffle("")).toEqual("");
    expect(shuffle(anyValue(123))).toEqual(123);
  });

  it("should use the CSPRNG and never Math.random", () => {
    const random = vi.spyOn(Math, "random");

    const result = shuffle([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(random).not.toHaveBeenCalled();
    expect([...result].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

    random.mockRestore();
  });

  it("should fall back to Math.random when the runtime has no CSPRNG", () => {
    // Shadow the method with an own property, then remove it to restore.
    Object.defineProperty(cryptoRef, "getRandomValues", {
      value: undefined,
      configurable: true,
      writable: true,
    });
    const random = vi.spyOn(Math, "random");

    try {
      const result = shuffle([1, 2, 3, 4, 5]);

      expect(random).toHaveBeenCalled();
      expect([...result].sort()).toEqual([1, 2, 3, 4, 5]);
    } finally {
      random.mockRestore();
      delete (cryptoRef as any).getRandomValues;
    }

    expect(typeof cryptoRef.getRandomValues).toBe("function");
  });
});
