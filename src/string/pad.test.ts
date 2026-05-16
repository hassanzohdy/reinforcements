import pad from "./pad";
import padEnd from "./padEnd";
import padStart from "./padStart";

describe("reinforcements/string/pad", () => {
  it("pads both sides evenly", () => {
    expect(pad("hi", 6)).toBe("  hi  ");
    expect(pad("hi", 7, "*")).toBe("**hi***");
  });

  it("returns input unchanged when already long enough", () => {
    expect(pad("hello", 3)).toBe("hello");
  });
});

describe("reinforcements/string/padStart", () => {
  it("pads start with given char", () => {
    expect(padStart("7", 3, "0")).toBe("007");
  });
});

describe("reinforcements/string/padEnd", () => {
  it("pads end with given char", () => {
    expect(padEnd("7", 3, "0")).toBe("700");
  });
});
