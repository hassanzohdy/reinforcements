import sleep from "./sleep";
import timeout from "./timeout";

describe("reinforcements/async/timeout", () => {
  it("resolves when the promise wins", async () => {
    const result = await timeout(Promise.resolve("ok"), 100);
    expect(result).toBe("ok");
  });

  it("rejects when the timer wins", async () => {
    await expect(timeout(sleep(100), 10)).rejects.toThrow(/timed out/i);
  });
});
