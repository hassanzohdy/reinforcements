import formatBytes from "./formatBytes";
import formatNumber from "./formatNumber";
import parseNumber from "./parseNumber";
import percentage from "./percentage";
import safeDivide from "./safeDivide";
import toFixed from "./toFixed";

describe("reinforcements/number/formatBytes", () => {
  it("formats with decimal units by default", () => {
    expect(formatBytes(1500)).toBe("1.50 KB");
    expect(formatBytes(0)).toBe("0 B");
  });

  it("supports binary units", () => {
    expect(formatBytes(1024, { binary: true, decimals: 0 })).toBe("1 KiB");
  });

  it("handles negative bytes", () => {
    expect(formatBytes(-1500, { decimals: 0 })).toBe("-2 KB");
  });
});

describe("reinforcements/number/formatNumber", () => {
  it("uses Intl.NumberFormat", () => {
    expect(formatNumber(1234.5, { locale: "en-US" })).toBe("1,234.5");
    expect(formatNumber(0.42, { locale: "en-US", style: "percent" })).toBe("42%");
  });
});

describe("reinforcements/number/percentage", () => {
  it("computes the percentage", () => {
    expect(percentage(25, 200)).toBe(12.5);
  });

  it("returns 0 for division by zero", () => {
    expect(percentage(1, 0)).toBe(0);
  });
});

describe("reinforcements/number/safeDivide", () => {
  it("divides normally", () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it("returns the fallback on divide-by-zero", () => {
    expect(safeDivide(10, 0)).toBe(0);
    expect(safeDivide(10, 0, null)).toBeNull();
  });
});

describe("reinforcements/number/parseNumber", () => {
  it("parses numeric strings", () => {
    expect(parseNumber("42")).toBe(42);
    expect(parseNumber("3.14")).toBe(3.14);
  });

  it("returns the fallback for invalid input", () => {
    expect(parseNumber("abc", -1)).toBe(-1);
    expect(parseNumber(null, 0)).toBe(0);
    expect(parseNumber(undefined, 0)).toBe(0);
    expect(parseNumber("", 0)).toBe(0);
  });
});

describe("reinforcements/number/toFixed", () => {
  it("rounds and returns a number", () => {
    expect(toFixed(1.236, 2)).toBe(1.24);
    expect(typeof toFixed(1.9, 0)).toBe("number");
  });
});
