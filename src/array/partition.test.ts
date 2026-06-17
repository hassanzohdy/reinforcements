import partition from "./partition";

describe("reinforcements/array/partition", () => {
  it("splits into [pass, fail] by predicate", () => {
    expect(partition([1, 2, 3, 4], n => n % 2 === 0)).toEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it("preserves order and passes the index", () => {
    const indexes: number[] = [];

    partition(["a", "b"], (_, i) => {
      indexes.push(i);
      return true;
    });

    expect(indexes).toEqual([0, 1]);
  });

  it("returns two empty arrays for a non-array", () => {
    expect(partition(null as any, () => true)).toEqual([[], []]);
  });
});
