import formatDuration from "./formatDuration";

describe("reinforcements/number/formatDuration", () => {
  it("formats multiple units", () => {
    expect(formatDuration(3661000)).toBe("1h 1m 1s");
  });

  it("includes days and milliseconds", () => {
    expect(formatDuration(90061001)).toBe("1d 1h 1m 1s 1ms");
  });

  it("caps the number of parts with units", () => {
    expect(formatDuration(3661000, { units: 2 })).toBe("1h 1m");
  });

  it("supports long labels with pluralization", () => {
    expect(formatDuration(90000, { long: true })).toBe("1 minute 30 seconds");
  });

  it("handles zero and negatives", () => {
    expect(formatDuration(0)).toBe("0ms");
    expect(formatDuration(-1000)).toBe("-1s");
  });

  it("returns the raw string for non-finite input", () => {
    expect(formatDuration(Infinity)).toBe("Infinity");
  });
});
