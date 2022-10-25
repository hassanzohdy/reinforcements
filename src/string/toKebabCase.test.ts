import toKebabCase from "./toKebabCase";

describe("@mongez/reinforcements/toKebabCase", () => {
  it("should convert string to kebab case", () => {
    expect(toKebabCase("hello world")).toBe("hello-world");
    expect(toKebabCase("hello-world")).toBe("hello-world");
    expect(toKebabCase("hello/world")).toBe("hello-world");
    expect(toKebabCase("helloWorld")).toBe("hello-world");
    expect(toKebabCase("HelloWorld")).toBe("hello-world");
  });

  it("should convert string to kebab string without lowering letters", () => {
    expect(toKebabCase("Hello world", false)).toBe("Hello-world");
    expect(toKebabCase("Hello-world", false)).toBe("Hello-world");
    expect(toKebabCase("Hello/world", false)).toBe("Hello-world");
    expect(toKebabCase("HelloWorld", false)).toBe("Hello-World");
    expect(toKebabCase("HelloWorld", false)).toBe("Hello-World");
  });
});
