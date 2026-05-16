import retry from "./retry";

describe("reinforcements/async/retry", () => {
  it("returns the first successful value", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    expect(await retry(fn)).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries until success", async () => {
    let calls = 0;
    const fn = vi.fn(async () => {
      calls++;
      if (calls < 3) throw new Error("nope");
      return "ok";
    });
    expect(await retry(fn, { attempts: 5 })).toBe("ok");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("throws the last error after exhausting attempts", async () => {
    const err = new Error("boom");
    const fn = vi.fn().mockRejectedValue(err);
    await expect(retry(fn, { attempts: 2 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
