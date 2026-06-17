import waitFor from "./waitFor";

describe("reinforcements/async/waitFor", () => {
  it("resolves once the condition becomes truthy", async () => {
    let ready = false;
    setTimeout(() => {
      ready = true;
    }, 5);

    await expect(
      waitFor(() => ready, { interval: 1 }),
    ).resolves.toBeUndefined();
  });

  it("rejects on timeout when the condition stays false", async () => {
    await expect(
      waitFor(() => false, { interval: 5, timeout: 1 }),
    ).rejects.toThrow(/timed out/);
  });
});
