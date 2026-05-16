import clone from "./clone";

describe("reinforcements/mixed/clone (extra cases)", () => {
  it("clones RegExp", () => {
    const re = /abc/gi;
    re.lastIndex = 3;
    const copy = clone(re);
    expect(copy).not.toBe(re);
    expect(copy.source).toBe(re.source);
    expect(copy.flags).toBe(re.flags);
  });

  it("clones Error preserving message and name", () => {
    const err = new TypeError("nope");
    (err as any).meta = { detail: true };
    const copy = clone(err) as TypeError;
    expect(copy).not.toBe(err);
    expect(copy.message).toBe("nope");
    expect(copy.name).toBe("TypeError");
    expect((copy as any).meta).toEqual({ detail: true });
  });

  it("handles circular references", () => {
    const a: any = { x: 1 };
    a.self = a;
    const copy = clone(a);
    expect(copy).not.toBe(a);
    expect(copy.self).toBe(copy);
  });

  it("clones typed arrays", () => {
    const arr = new Uint8Array([1, 2, 3]);
    const copy = clone(arr);
    expect(copy).not.toBe(arr);
    expect(Array.from(copy)).toEqual([1, 2, 3]);
  });
});
