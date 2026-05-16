import compose from "./compose";
import pipe from "./pipe";

describe("reinforcements/utils/pipe", () => {
  it("threads value left-to-right", () => {
    expect(pipe(2, (n: number) => n + 1, (n: number) => n * 10)).toBe(30);
  });

  it("returns input unchanged with no fns", () => {
    expect(pipe(7)).toBe(7);
  });
});

describe("reinforcements/utils/compose", () => {
  it("composes right-to-left", () => {
    const shout = compose(
      (s: string) => s + "!",
      (s: string) => s.toUpperCase(),
    );
    expect(shout("hi")).toBe("HI!");
  });
});
