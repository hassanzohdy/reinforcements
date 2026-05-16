import defer from "./defer";

describe("reinforcements/async/defer", () => {
  it("exposes externally resolvable promise", async () => {
    const d = defer<string>();
    setTimeout(() => d.resolve("ok"), 0);
    await expect(d.promise).resolves.toBe("ok");
  });

  it("exposes externally rejectable promise", async () => {
    const d = defer<string>();
    setTimeout(() => d.reject(new Error("nope")), 0);
    await expect(d.promise).rejects.toThrow("nope");
  });
});
