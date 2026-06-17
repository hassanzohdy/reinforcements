import attempt from "./attempt";

describe("reinforcements/utils/attempt", () => {
  it("returns the result when the sync fn succeeds", () => {
    expect(attempt(() => JSON.parse('{"a":1}'), {})).toEqual({ a: 1 });
  });

  it("returns the fallback when the sync fn throws", () => {
    expect(attempt(() => JSON.parse("nope"), { ok: false })).toEqual({
      ok: false,
    });
  });

  it("returns undefined when no fallback is given", () => {
    expect(
      attempt(() => {
        throw new Error("x");
      }),
    ).toBeUndefined();
  });

  it("resolves async results", async () => {
    await expect(attempt(async () => 1, 0)).resolves.toBe(1);
  });

  it("returns the fallback when an async fn rejects", async () => {
    await expect(
      attempt(async () => {
        throw new Error("x");
      }, "fallback"),
    ).resolves.toBe("fallback");
  });
});
