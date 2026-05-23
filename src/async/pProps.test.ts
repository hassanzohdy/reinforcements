import pProps from "./pProps";

describe("reinforcements/async/pProps", () => {
  it("resolves all promise values in parallel", async () => {
    const result = await pProps({
      user: Promise.resolve({ id: 1 }),
      settings: Promise.resolve({ theme: "dark" }),
      home: Promise.resolve({ feed: [] }),
    });

    expect(result).toEqual({
      user: { id: 1 },
      settings: { theme: "dark" },
      home: { feed: [] },
    });
  });

  it("preserves the input keys and infers value types", async () => {
    const { user, settings } = await pProps({
      user: Promise.resolve("Ada"),
      settings: Promise.resolve(42),
    });

    expect(user).toBe("Ada");
    expect(settings).toBe(42);
  });

  it("accepts non-promise values alongside promises", async () => {
    const result = await pProps({
      a: 1,
      b: Promise.resolve(2),
      c: "literal",
    });

    expect(result).toEqual({ a: 1, b: 2, c: "literal" });
  });

  it("rejects on the first rejected promise", async () => {
    await expect(
      pProps({
        ok: Promise.resolve(1),
        bad: Promise.reject(new Error("boom")),
      }),
    ).rejects.toThrow("boom");
  });

  it("runs work in parallel (not sequentially)", async () => {
    const start = Date.now();
    await pProps({
      a: new Promise(r => setTimeout(() => r(1), 50)),
      b: new Promise(r => setTimeout(() => r(2), 50)),
      c: new Promise(r => setTimeout(() => r(3), 50)),
    });
    const elapsed = Date.now() - start;

    // Parallel: ~50ms. Sequential would be ~150ms.
    expect(elapsed).toBeLessThan(120);
  });

  it("returns an empty object for empty input", async () => {
    expect(await pProps({})).toEqual({});
  });
});
