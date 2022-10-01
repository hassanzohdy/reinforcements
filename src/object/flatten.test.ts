import flatten from "./flatten";

describe("reinforcements/object/flat", () => {
  it("should return a flatten object", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj)).toEqual({
      a: 1,
      "b.c": 2,
      "b.d.e": 3,
    });
  });

  it("should return a flatten object with custom separator", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/")).toEqual({
      a: 1,
      "b/c": 2,
      "b/d/e": 3,
    });
  });

  it("should return a flatten object with custom separator and parent", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/", "root")).toEqual({
      "root/a": 1,
      "root/b/c": 2,
      "root/b/d/e": 3,
    });
  });

  it("should return a flatten object with custom separator and parent and root", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/", "root", {})).toEqual({
      "root/a": 1,
      "root/b/c": 2,
      "root/b/d/e": 3,
    });
  });
});
