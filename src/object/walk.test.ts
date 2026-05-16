import walk from "./walk";

describe("reinforcements/object/walk", () => {
  it("visits every leaf with its path", () => {
    const out: Array<[string, any]> = [];
    walk({ a: { b: 1, c: [2, 3] } }, (value, path) => {
      out.push([path, value]);
    });

    expect(out).toEqual([
      ["a.b", 1],
      ["a.c.0", 2],
      ["a.c.1", 3],
    ]);
  });

  it("does not call the visitor for empty inputs", () => {
    const visited: any[] = [];
    walk({}, value => visited.push(value));
    expect(visited).toEqual([]);
  });
});
