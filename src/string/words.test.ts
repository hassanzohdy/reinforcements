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

describe("reinforcements/string/words (performance)", () => {
  it("is linear on a long run of capitals", () => {
    const input = "A".repeat(50000);
    const started = performance.now();

    expect(words(input)).toEqual([input]);
    expect(performance.now() - started).toBeLessThan(200);
  });

  it("keeps acronym boundaries", () => {
    expect(words("ABCdef")).toEqual(["AB", "Cdef"]);
    expect(words("getHTTPResponseCode")).toEqual([
      "get",
      "HTTP",
      "Response",
      "Code",
    ]);
  });
});
