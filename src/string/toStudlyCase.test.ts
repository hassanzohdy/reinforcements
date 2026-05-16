import toStudlyCase from "./toStudlyCase";

describe("reinforcements/string/toStudlyCase", () => {
  it("converts to PascalCase", () => {
    expect(toStudlyCase("hello-world")).toBe("HelloWorld");
    expect(toStudlyCase("hello_world")).toBe("HelloWorld");
    expect(toStudlyCase("hello.world")).toBe("HelloWorld");
    expect(toStudlyCase("hello/world")).toBe("HelloWorld");
    expect(toStudlyCase("hello world")).toBe("HelloWorld");
  });

  it("handles acronyms correctly", () => {
    expect(toStudlyCase("ai_agent")).toBe("AiAgent");
    expect(toStudlyCase("XMLHttpRequest")).toBe("XmlHttpRequest");
  });
});
