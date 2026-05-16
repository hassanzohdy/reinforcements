import removeFirst from "./removeFirst";
import removeLast from "./removeLast";
import replaceAll from "./replaceAll";
import replaceFirst from "./replaceFirst";
import replaceLast from "./replaceLast";

describe("reinforcements/string/replaceAll", () => {
  it("replaces every occurrence", () => {
    expect(replaceAll("a-b-c", "-", "_")).toBe("a_b_c");
  });
});

describe("reinforcements/string/replaceFirst", () => {
  it("replaces only the first occurrence", () => {
    expect(replaceFirst("foo foo foo", "foo", "bar")).toBe("bar foo foo");
  });
});

describe("reinforcements/string/replaceLast", () => {
  it("replaces only the last occurrence", () => {
    expect(replaceLast("foo bar foo", "foo", "baz")).toBe("foo bar baz");
  });

  it("returns input unchanged when needle is absent", () => {
    expect(replaceLast("hello", "x", "y")).toBe("hello");
  });
});

describe("reinforcements/string/removeFirst & removeLast", () => {
  it("removes by delegating to replace", () => {
    expect(removeFirst("foo bar foo", "foo")).toBe(" bar foo");
    expect(removeLast("foo bar foo", "foo")).toBe("foo bar ");
  });
});
