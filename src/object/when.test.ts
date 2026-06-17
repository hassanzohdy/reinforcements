import when from "./when";

describe("reinforcements/object/when", () => {
  it("returns the value when the condition is truthy", () => {
    expect(when(1 === 1, { newApp: true })).toEqual({ newApp: true });
  });

  it("returns an empty object when the condition is falsy", () => {
    expect(when(false, { newApp: true })).toEqual({});
  });

  it("conditionally adds a key when spread into an object literal", () => {
    const isAdmin = false;

    expect({ name: "Ada", ...when(isAdmin, { role: "admin" }) }).toEqual({
      name: "Ada",
    });

    expect({ name: "Ada", ...when(!isAdmin, { role: "user" }) }).toEqual({
      name: "Ada",
      role: "user",
    });
  });

  it("invokes a factory value only when the condition is truthy", () => {
    const factory = vi.fn(() => ({ data: 1 }));

    expect(when(false, factory)).toEqual({});
    expect(factory).not.toHaveBeenCalled();

    expect(when(true, factory)).toEqual({ data: 1 });
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("treats any truthy/falsy value as the condition", () => {
    expect(when("yes", { ok: true })).toEqual({ ok: true });
    expect(when(0, { ok: true })).toEqual({});
    expect(when(null, { ok: true })).toEqual({});
    expect(when(undefined, { ok: true })).toEqual({});
  });
});
