import unzip from "./unzip";

describe("reinforcements/array/unzip", () => {
  it("is the inverse of zip", () => {
    expect(unzip([
      [1, "a"],
      [2, "b"],
    ])).toEqual([
      [1, 2],
      ["a", "b"],
    ]);
  });

  it("fills ragged rows with undefined", () => {
    expect(unzip([[1, "a"], [2]])).toEqual([
      [1, 2],
      ["a", undefined],
    ]);
  });

  it("returns [] for an empty input", () => {
    expect(unzip([])).toEqual([]);
  });
});
