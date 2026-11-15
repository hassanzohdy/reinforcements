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

describe("reinforcements/string/replace (literal semantics)", () => {
  it("does not expand $ patterns in the replacement", () => {
    expect(replaceAll("Hello {name}, bye", "{name}", "$'")).toBe(
      "Hello $', bye",
    );
    expect(replaceAll("a-b", "-", "$&$&")).toBe("a$&$&b");
    expect(replaceFirst("a-b", "-", "$`")).toBe("a$`b");
  });

  it("replaceFirst / removeFirst match needles with regex characters", () => {
    expect(replaceFirst("a.b.c", ".", "-")).toBe("a-b.c");
    expect(removeFirst("a.b.c", ".")).toBe("ab.c");
    expect(replaceFirst("a+b", "+", "-")).toBe("a-b");
  });

  it("returns the string unchanged when the needle is absent", () => {
    expect(replaceFirst("abc", "x", "y")).toBe("abc");
    expect(replaceAll("abc", "x", "y")).toBe("abc");
    expect(removeFirst("abc", "x")).toBe("abc");
  });

  it("keeps the old result for an empty needle", () => {
    expect(replaceFirst("abc", "", "-")).toBe("-abc");
    expect(replaceAll("ab", "", "-")).toBe("-a-b-");
  });
});
