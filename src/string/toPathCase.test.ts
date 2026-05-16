import toPathCase from "./toPathCase";

test("toPathCase joins tokens with slashes", () => {
  expect(toPathCase("helloWorld")).toBe("hello/world");
});
