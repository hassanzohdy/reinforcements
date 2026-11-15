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

  const deepJson = () =>
    JSON.parse('{"a":'.repeat(3000) + "1" + "}".repeat(3000));

  it("throws a clear error for input nested deeper than 256 levels", () => {
    expect(() => walk(deepJson(), () => undefined)).toThrow(
      /nested deeper than 256 levels/,
    );
  });

  it("throws a clear error for circular input", () => {
    const object: any = { b: 1 };

    object.self = object;

    expect(() => walk(object, () => undefined)).toThrow(/circular reference/);
  });

  it("visits shared (non-circular) references more than once", () => {
    const shared = { x: 1 };
    const paths: string[] = [];

    walk({ a: shared, b: shared }, (_, path) => paths.push(path));

    expect(paths).toEqual(["a.x", "b.x"]);
  });
});
