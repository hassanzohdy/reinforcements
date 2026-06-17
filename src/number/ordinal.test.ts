import ordinal from "./ordinal";

describe("reinforcements/number/ordinal", () => {
  it("formats the basic suffixes", () => {
    expect(ordinal(1)).toBe("1st");
    expect(ordinal(2)).toBe("2nd");
    expect(ordinal(3)).toBe("3rd");
    expect(ordinal(4)).toBe("4th");
  });

  it("handles the 11-13 exception", () => {
    expect(ordinal(11)).toBe("11th");
    expect(ordinal(12)).toBe("12th");
    expect(ordinal(13)).toBe("13th");
    expect(ordinal(111)).toBe("111th");
  });

  it("handles larger numbers", () => {
    expect(ordinal(21)).toBe("21st");
    expect(ordinal(22)).toBe("22nd");
    expect(ordinal(113)).toBe("113th");
  });

  it("truncates fractions and handles negatives", () => {
    expect(ordinal(1.9)).toBe("1st");
    expect(ordinal(-1)).toBe("-1st");
  });

  it("returns only the suffix when withNumber is false", () => {
    expect(ordinal(2, { withNumber: false })).toBe("nd");
  });
});
