import Random from "./random";

describe("reinforcements/random", () => {
  it("should generate random integer in range", () => {
    for (let i = 0; i < 100; i++) {
      const value = Random.int(0, 100);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it("should generate random string of given length", () => {
    for (let i = 0; i < 100; i++) {
      const length = Random.int(1, 100);
      const value = Random.string(length);
      expect(value.length).toBe(length);
      expect(value).toMatch(/^[a-zA-Z0-9]+$/);
    }
  });

  it("should generate random id with prefix and length", () => {
    for (let i = 0; i < 100; i++) {
      expect(Random.id()).toMatch(/^el-[a-zA-Z0-9]{6}$/);
      const length = Random.int(1, 100);
      expect(Random.id(length)).toMatch(new RegExp(`^el-[a-zA-Z0-9]{${length}}$`));
    }
  });

  it("should generate random boolean", () => {
    let trues = 0;
    let falses = 0;
    for (let i = 0; i < 1000; i++) {
      if (Random.bool()) trues++;
      else falses++;
    }
    expect(trues).toBeGreaterThan(0);
    expect(falses).toBeGreaterThan(0);
  });

  it("should generate random date", () => {
    for (let i = 0; i < 100; i++) {
      expect(Random.date()).toBeInstanceOf(Date);
    }
  });

  it("should generate random color padded to 6 hex digits", () => {
    for (let i = 0; i < 200; i++) {
      expect(Random.color()).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("should pick a single element", () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(Random.pick(arr));
    }
    expect(Random.pick([])).toBeUndefined();
  });

  it("should sample unique elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const sample = Random.sample(arr, 3);
    expect(sample.length).toBe(3);
    expect(new Set(sample).size).toBe(3);
    expect(Random.sample(arr, 100).length).toBe(arr.length);
  });

  it("should pick weighted values", () => {
    const items = [
      { value: "a", weight: 0 },
      { value: "b", weight: 1 },
    ];
    for (let i = 0; i < 20; i++) {
      expect(Random.weighted(items)).toBe("b");
    }
  });

  it("should generate a v4-ish uuid", () => {
    for (let i = 0; i < 20; i++) {
      expect(Random.uuid()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    }
  });

  it("should generate a nanoid of given size", () => {
    expect(Random.nanoid().length).toBe(21);
    expect(Random.nanoid(10)).toMatch(/^[A-Za-z0-9_-]{10}$/);
  });

  it("should generate hex tokens of given byte length", () => {
    expect(Random.token(8)).toMatch(/^[0-9a-f]{16}$/);
  });

  it("should produce reproducible output when seeded", () => {
    Random.seed(42);
    const a = Random.int(1, 1000);
    Random.seed(42);
    const b = Random.int(1, 1000);
    expect(a).toBe(b);
    Random.seed(undefined);
  });
});

describe("reinforcements/random/csprng", () => {
  /**
   * Reload the Random modules with `globalThis.crypto` removed — the
   * crypto reference is captured at module load time.
   */
  async function withoutCrypto<T>(
    run: (random: typeof Random) => Promise<T> | T,
  ): Promise<T> {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");

    delete (globalThis as any).crypto;
    vi.resetModules();

    try {
      const { default: reloaded } = await import("./random");

      return await run(reloaded);
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, "crypto", descriptor);
      }

      vi.resetModules();
    }
  }

  it("should throw instead of falling back for tokens and uuids", async () => {
    await withoutCrypto(random => {
      expect(() => random.token(16)).toThrow(/No CSPRNG available/);
      expect(() => random.uuid()).toThrow(/No CSPRNG available/);
    });
  });

  it("should throw instead of falling back for ids and random strings", async () => {
    await withoutCrypto(random => {
      expect(() => random.string(32)).toThrow(/No CSPRNG available/);
      expect(() => random.nanoid()).toThrow(/No CSPRNG available/);
      expect(() => random.id()).toThrow(/No CSPRNG available/);
      // Even a zero-length request must not look like a success.
      expect(() => random.string(0)).toThrow(/No CSPRNG available/);
    });
  });

  it("should not honor the seed for token-shaped generators", () => {
    Random.seed(42);
    const first = [Random.string(16), Random.nanoid(16), Random.token(16)];
    Random.seed(42);
    const second = [Random.string(16), Random.nanoid(16), Random.token(16)];
    Random.seed(undefined);

    expect(second).not.toEqual(first);
  });

  it("should produce correct-length CSPRNG output", () => {
    for (const length of [1, 6, 21, 32, 100]) {
      expect(Random.string(length)).toMatch(
        new RegExp(`^[A-Za-z0-9]{${length}}$`),
      );
      expect(Random.nanoid(length)).toMatch(
        new RegExp(`^[A-Za-z0-9_-]{${length}}$`),
      );
      expect(Random.id(length, "user-")).toMatch(
        new RegExp(`^user-[A-Za-z0-9]{${length}}$`),
      );
    }

    expect(Random.string(0)).toBe("");
    expect(Random.string()).toHaveLength(32);
    expect(Random.nanoid()).toHaveLength(21);
  });

  it("should cover the whole charset without modulo bias", () => {
    const seen = new Set(Random.nanoid(20000).split(""));

    // 64 URL-safe characters; rejection sampling keeps them equiprobable.
    expect(seen.size).toBe(64);
  });
});
