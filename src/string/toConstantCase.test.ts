import toConstantCase from "./toConstantCase";

test("toConstantCase produces SCREAMING_SNAKE", () => {
  expect(toConstantCase("helloWorld")).toBe("HELLO_WORLD");
  expect(toConstantCase("AIAgent")).toBe("AI_AGENT");
  expect(toConstantCase("hello-world")).toBe("HELLO_WORLD");
});
