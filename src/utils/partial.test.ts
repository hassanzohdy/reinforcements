import partial from "./partial";
import partialRight from "./partialRight";

describe("reinforcements/utils/partial", () => {
  it("binds leading args", () => {
    const greet = (greeting: string, name: string) => `${greeting}, ${name}`;
    const hello = partial(greet, "Hello");
    expect(hello("Ada")).toBe("Hello, Ada");
  });
});

describe("reinforcements/utils/partialRight", () => {
  it("binds trailing args", () => {
    const divide = (a: number, b: number) => a / b;
    const halve = partialRight(divide, 2);
    expect(halve(10)).toBe(5);
  });
});
