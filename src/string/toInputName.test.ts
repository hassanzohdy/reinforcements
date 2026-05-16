import toInputName from "./toInputName";

describe("reinforcements/string/toInputName", () => {
  it("turns dot-notation into bracket-notation form names", () => {
    expect(toInputName("user.name")).toBe("user[name]");
    expect(toInputName("user.address.city")).toBe("user[address][city]");
  });

  it("preserves trailing []", () => {
    expect(toInputName("user.tags[]")).toBe("user[tags][]");
  });

  it("returns empty for empty input", () => {
    expect(toInputName("")).toBe("");
  });
});
