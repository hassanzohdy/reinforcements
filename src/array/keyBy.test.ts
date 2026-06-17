import keyBy from "./keyBy";

describe("reinforcements/array/keyBy", () => {
  it("indexes by a string key", () => {
    expect(keyBy([{ id: 1 }, { id: 2 }], "id")).toEqual({
      "1": { id: 1 },
      "2": { id: 2 },
    });
  });

  it("supports dot-notation keys", () => {
    expect(keyBy([{ a: { b: "x" } }], "a.b")).toEqual({
      x: { a: { b: "x" } },
    });
  });

  it("supports a selector function", () => {
    expect(
      keyBy([{ email: "a@x" }, { email: "b@x" }], user => user.email),
    ).toEqual({
      "a@x": { email: "a@x" },
      "b@x": { email: "b@x" },
    });
  });

  it("last item wins on key collision", () => {
    expect(
      keyBy(
        [
          { id: 1, v: "a" },
          { id: 1, v: "b" },
        ],
        "id",
      ),
    ).toEqual({ "1": { id: 1, v: "b" } });
  });

  it("returns {} for a non-array", () => {
    expect(keyBy(null as any, "id")).toEqual({});
  });
});
