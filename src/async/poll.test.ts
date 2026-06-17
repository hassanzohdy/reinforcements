import poll from "./poll";

describe("reinforcements/async/poll", () => {
  it("resolves with the first truthy result by default", async () => {
    let n = 0;

    const result = await poll(() => (++n >= 3 ? n : 0), { interval: 1 });

    expect(result).toBe(3);
  });

  it("uses a custom until predicate", async () => {
    let calls = 0;

    const result = await poll(
      () => {
        calls++;
        return { status: calls >= 2 ? "done" : "pending" };
      },
      { interval: 1, until: r => r.status === "done" },
    );

    expect(result).toEqual({ status: "done" });
    expect(calls).toBe(2);
  });

  it("rejects after the attempts cap", async () => {
    await expect(
      poll(() => false, { interval: 1, attempts: 3 }),
    ).rejects.toThrow(/3 attempts/);
  });

  it("rejects on timeout", async () => {
    await expect(
      poll(() => false, { interval: 5, timeout: 1 }),
    ).rejects.toThrow(/timed out/);
  });

  it("rejects when the signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      poll(() => true, { signal: controller.signal }),
    ).rejects.toThrow(/aborted/);
  });

  it("passes the attempt number to fn", async () => {
    const attempts: number[] = [];

    await poll(
      attempt => {
        attempts.push(attempt);
        return attempt >= 3;
      },
      { interval: 1 },
    );

    expect(attempts).toEqual([1, 2, 3]);
  });
});
