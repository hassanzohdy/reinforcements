import unique from "./unique";

describe("reinforcements/arrays/unique", () => {
  it("should return the unique values of the given array", () => {
    expect(unique([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(
      unique([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(
      unique([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10,
      ]),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(
      unique([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should return the unique values of the given array of objects", () => {
    expect(
      unique(
        [
          { id: 1, name: "John" },
          { id: 2, name: "Jane" },
          { id: 3, name: "Jack" },
          { id: 4, name: "Jill" },
          { id: 5, name: "Jenny" },
          { id: 6, name: "Jenny" },
          { id: 7, name: "Jenny" },
          { id: 8, name: "Jenny" },
          { id: 9, name: "Jenny" },
          { id: 10, name: "Jenny" },
        ],
        "name",
      ),
    ).toEqual(["John", "Jane", "Jack", "Jill", "Jenny"]);
  });
});
