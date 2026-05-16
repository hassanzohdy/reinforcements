import extension from "./extension";

describe("reinforcements/string/extension", () => {
  it("returns the file extension", () => {
    expect(extension("foo.txt")).toBe("txt");
    expect(extension("archive.tar.gz")).toBe("gz");
  });

  it("returns empty for inputs without an extension", () => {
    expect(extension("README")).toBe("");
    expect(extension("")).toBe("");
  });
});
