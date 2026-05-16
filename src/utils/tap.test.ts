import tap from "./tap";

describe("reinforcements/utils/tap", () => {
  it("runs side effect and returns value", () => {
    const fn = vi.fn();
    expect(tap(42, fn)).toBe(42);
    expect(fn).toHaveBeenCalledWith(42);
  });

  it("tap.with returns a pipeline-friendly function", () => {
    const fn = vi.fn();
    const t = tap.with(fn);
    expect(t("hi")).toBe("hi");
    expect(fn).toHaveBeenCalledWith("hi");
  });
});
