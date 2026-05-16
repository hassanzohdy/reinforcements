import toCamelCase from "./toCamelCase";

test("proper camel case", () => {
  expect(toCamelCase("my-name")).toBe("myName");
  expect(toCamelCase("my_name")).toBe("myName");
  expect(toCamelCase("my name")).toBe("myName");
  expect(toCamelCase("my/name")).toBe("myName");
  expect(toCamelCase("my.name")).toBe("myName");
});

test("acronym handling", () => {
  expect(toCamelCase("XMLHttpRequest")).toBe("xmlHttpRequest");
  expect(toCamelCase("AIAgent")).toBe("aiAgent");
  expect(toCamelCase("parseURL")).toBe("parseUrl");
});

test("non-separator characters are preserved", () => {
  expect(toCamelCase("")).toBe("");
  expect(toCamelCase("myName")).toBe("myName");
  expect(toCamelCase("my|name")).toBe("my|name");
});
