import merge from "./merge";

describe("reinforcements/object/merge", () => {
  it("should merge two simple objects", () => {
    expect(merge({ a: 1, b: 2 }, { c: 3, d: 4 })).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });

  it("should deep-merge nested objects", () => {
    expect(
      merge(
        { a: 1, b: 2, c: { d: 3, e: 4 } },
        { c: { f: 5, g: 6 }, h: 7 },
      ),
    ).toEqual({
      a: 1,
      b: 2,
      c: { d: 3, e: 4, f: 5, g: 6 },
      h: 7,
    });
  });

  it("should replace arrays by default", () => {
    expect(
      merge({ list: [1, 2, 3] }, { list: [4, 5, 6] }),
    ).toEqual({ list: [4, 5, 6] });
  });

  it("should concatenate arrays when arrays: 'concat'", () => {
    expect(
      merge({ list: [1, 2] }, { list: [3, 4] }, { arrays: "concat" }),
    ).toEqual({ list: [1, 2, 3, 4] });
  });

  it("should union arrays when arrays: 'union'", () => {
    expect(
      merge({ list: [1, 2] }, { list: [2, 3] }, { arrays: "union" }),
    ).toEqual({ list: [1, 2, 3] });
  });

  it("should replace class instances with the latest source", () => {
    class Board {
      constructor(public name: string) {}
    }
    expect(
      merge({ board: new Board("A") }, { board: new Board("B") }).board.name,
    ).toEqual("B");
  });

  it("should treat undefined source as no-op", () => {
    expect(merge({ a: 1 }, undefined)).toEqual({ a: 1 });
  });

  it("should adopt source when target is nullish", () => {
    expect(merge(null, { a: 1 })).toEqual({ a: 1 });
    expect(merge(undefined, [1, 2])).toEqual([1, 2]);
  });
});
