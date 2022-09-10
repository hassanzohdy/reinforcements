import toCamelCase from "./toCamelCase";

test("proper camel case", () => {
  expect(toCamelCase("my-name")).toBe("myName");
  expect(toCamelCase("my_name")).toBe("myName");
  expect(toCamelCase("my name")).toBe("myName");
  expect(toCamelCase("my/name")).toBe("myName");
  expect(toCamelCase("my.name")).toBe("myName");
});

test("Un Effected values", () => {
  expect(toCamelCase("")).toBe("");
  expect(toCamelCase("myName")).toBe("myName");
  expect(toCamelCase("my|name")).toBe("my|name");
  expect(toCamelCase("my\\name")).toBe("my\\name");
});
