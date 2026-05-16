import toPascalCase from "./toPascalCase";

test("toPascalCase mirrors toStudlyCase", () => {
  expect(toPascalCase("hello world")).toBe("HelloWorld");
  expect(toPascalCase("AIAgent")).toBe("AiAgent");
});
