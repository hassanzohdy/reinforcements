import pReduce from "./pReduce";

describe("reinforcements/async/pReduce", () => {
  it("reduces sequentially with an async reducer", async () => {
    const result = await pReduce([1, 2, 3], async (sum, n) => sum + n, 0);

    expect(result).toBe(6);
  });

  it("preserves order of execution", async () => {
    const order: number[] = [];

    await pReduce(
      [10, 5, 1],
      async (acc, ms) => {
        order.push(ms);
        return acc;
      },
      null,
    );

    expect(order).toEqual([10, 5, 1]);
  });

  it("returns the initial value for an empty list", async () => {
    expect(await pReduce([], (a: number) => a, 42)).toBe(42);
  });

  it("exposes the index", async () => {
    const indexes: number[] = [];

    await pReduce(
      ["a", "b"],
      (acc, _, i) => {
        indexes.push(i);
        return acc;
      },
      null,
    );

    expect(indexes).toEqual([0, 1]);
  });
});
