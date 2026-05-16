import pAll from "./pAll";
import pAllSettled from "./pAllSettled";
import pFilter from "./pFilter";
import pMap from "./pMap";
import pSeries from "./pSeries";
import sleep from "./sleep";

describe("reinforcements/async/pMap", () => {
  it("maps with bounded concurrency, preserving order", async () => {
    const result = await pMap([1, 2, 3, 4], async n => n * 2, { concurrency: 2 });
    expect(result).toEqual([2, 4, 6, 8]);
  });

  it("returns [] for empty input", async () => {
    expect(await pMap([], async () => 1)).toEqual([]);
  });

  it("propagates errors", async () => {
    await expect(
      pMap([1, 2], async n => {
        if (n === 2) throw new Error("nope");
        return n;
      }),
    ).rejects.toThrow("nope");
  });
});

describe("reinforcements/async/pSeries", () => {
  it("runs sequentially in order", async () => {
    const order: number[] = [];
    await pSeries([1, 2, 3], async n => {
      await sleep(0);
      order.push(n);
    });
    expect(order).toEqual([1, 2, 3]);
  });
});

describe("reinforcements/async/pFilter", () => {
  it("filters with async predicate", async () => {
    const result = await pFilter([1, 2, 3, 4], async n => n % 2 === 0);
    expect(result).toEqual([2, 4]);
  });
});

describe("reinforcements/async/pAll & pAllSettled", () => {
  it("pAll resolves to tuple", async () => {
    const tuple = await pAll([Promise.resolve(1), Promise.resolve("two")]);
    expect(tuple).toEqual([1, "two"]);
  });

  it("pAllSettled resolves to settled results", async () => {
    const results = await pAllSettled([
      Promise.resolve(1),
      Promise.reject(new Error("x")),
    ]);
    expect(results[0]).toMatchObject({ status: "fulfilled", value: 1 });
    expect(results[1]).toMatchObject({ status: "rejected" });
  });
});
