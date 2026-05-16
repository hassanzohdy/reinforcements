import toDotCase from "./toDotCase";

test("toDotCase joins tokens with dots", () => {
  expect(toDotCase("helloWorld")).toBe("hello.world");
  expect(toDotCase("HELLO_WORLD")).toBe("hello.world");
});
