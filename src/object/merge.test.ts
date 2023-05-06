import merge from "./merge";

describe("reinforcements/object/merge", () => {
  it("should merge two simple objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it("should merge two complex objects", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3, e: 4 } };
    const obj2 = { c: { f: 5, g: 6 }, h: 7 };
    expect(merge(obj1, obj2)).toEqual({
      a: 1,
      b: 2,
      c: { d: 3, e: 4, f: 5, g: 6 },
      h: 7,
    });
  });

  it("should merge two complex objects that contains arrays", () => {
    const obj1 = { a: 1, b: 2, c: { d: 3, e: 4, f: [1, 2, 3] } };
    const obj2 = { c: { f: [4, 5, 6], g: 6 }, h: 7 };
    expect(merge(obj1, obj2)).toEqual({
      a: 1,
      b: 2,
      c: { d: 3, e: 4, f: [4, 5, 6], g: 6 },
      h: 7,
    });
  });

  it("should merge two complex objects that contains methods and instance of es6 classes", () => {
    class Board {
      constructor(public name: string) {}

      getName() {
        return this.name;
      }
    }

    const obj1 = {
      a: 1,
      b: 2,
      c: { d: 3, e: 4, f: [1, 2, 3] },
      board: new Board("Board 1"),
    };
    const obj2 = {
      c: { f: [4, 5, 6], g: 6 },
      h: 7,
      board: new Board("Board 2"),
    };

    expect(merge(obj1, obj2)).toEqual({
      a: 1,
      b: 2,
      c: { d: 3, e: 4, f: [4, 5, 6], g: 6 },
      h: 7,
      board: new Board("Board 2"),
    });
  });

  it("should return first value if it is empty", () => {
    expect(merge(null, undefined)).toEqual(null);
    expect(merge(null, 0)).toEqual(null);
    expect(merge(null, "")).toEqual(null);
    expect(merge(null, false)).toEqual(null);
    expect(merge(null, true)).toEqual(null);
    expect(merge(null, [])).toEqual(null);
    expect(merge(null, {})).toEqual(null);
  });
});
