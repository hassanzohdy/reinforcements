import toSnakeCase from "./toSnakeCase";

describe("@mongez/reinforcements/toSnakeCase", () => {
  it("should convert string to snake case", () => {
    expect(toSnakeCase("hello world")).toBe("hello_world");
    expect(toSnakeCase("hello-world")).toBe("hello_world");
    expect(toSnakeCase("hello/world")).toBe("hello_world");
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
    expect(toSnakeCase("HelloWorld")).toBe("hello_world");
  });

  it("should convert string to snake case with custom separator", () => {
    expect(toSnakeCase("hello world", "-")).toBe("hello-world");
    expect(toSnakeCase("hello-world", "-")).toBe("hello-world");
    expect(toSnakeCase("hello/world", "-")).toBe("hello-world");
    expect(toSnakeCase("helloWorld", "-")).toBe("hello-world");
    expect(toSnakeCase("HelloWorld", "-")).toBe("hello-world");
  });

  it("should convert string to snake case with custom separator and lowerAll", () => {
    expect(toSnakeCase("Hello world", "_", false)).toBe("Hello_world");
    expect(toSnakeCase("Hello-world", "_", false)).toBe("Hello_world");
    expect(toSnakeCase("Hello/world", "_", false)).toBe("Hello_world");
    expect(toSnakeCase("HelloWorld", "_", false)).toBe("Hello_World");
    expect(toSnakeCase("HelloWorld", "_", false)).toBe("Hello_World");
  });
});
