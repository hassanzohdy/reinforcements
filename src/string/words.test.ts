import words from "./words";

describe("reinforcements/string/words", () => {
  it("splits camelCase / PascalCase", () => {
    expect(words("helloWorld")).toEqual(["hello", "World"]);
    expect(words("HelloWorld")).toEqual(["Hello", "World"]);
  });

  it("preserves acronym runs as a single token", () => {
    expect(words("XMLHttpRequest")).toEqual(["XML", "Http", "Request"]);
    expect(words("AIAgent")).toEqual(["AI", "Agent"]);
    expect(words("parseURL")).toEqual(["parse", "URL"]);
    expect(words("IOError")).toEqual(["IO", "Error"]);
  });

  it("splits on separators", () => {
    expect(words("hello-world")).toEqual(["hello", "world"]);
    expect(words("hello_world")).toEqual(["hello", "world"]);
    expect(words("hello.world")).toEqual(["hello", "world"]);
    expect(words("hello/world")).toEqual(["hello", "world"]);
    expect(words("hello world")).toEqual(["hello", "world"]);
  });

  it("returns an empty array for empty input", () => {
    expect(words("")).toEqual([]);
    expect(words(undefined as any)).toEqual([]);
  });
});
