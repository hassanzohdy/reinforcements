import zip from "./zip";

describe("reinforcements/array/zip", () => {
  it("pairs values by index", () => {
    expect(zip([1, 2], ["a", "b"])).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("fills missing positions with undefined (longest wins)", () => {
    expect(zip([1], ["a", "b"])).toEqual([
      [1, "a"],
      [undefined, "b"],
    ]);
  });

  it("returns [] with no arrays", () => {
    expect(zip()).toEqual([]);
  });
});
