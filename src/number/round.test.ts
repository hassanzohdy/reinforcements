import ceil from "./ceil";
import floor from "./floor";
import round from "./round";

describe("reinforcements/number/round", () => {
  it("rounds correctly (not floor)", () => {
    expect(round(1.9, 0)).toBe(2);
    expect(round(1.235, 2)).toBe(1.24);
    expect(round(1.5, 0)).toBe(2);
  });
});

describe("reinforcements/number/floor", () => {
  it("floors with precision", () => {
    expect(floor(1.99, 1)).toBe(1.9);
    expect(floor(1.99)).toBe(1);
  });
});

describe("reinforcements/number/ceil", () => {
  it("ceils with precision", () => {
    expect(ceil(1.01, 1)).toBe(1.1);
    expect(ceil(1.01)).toBe(2);
  });
});
