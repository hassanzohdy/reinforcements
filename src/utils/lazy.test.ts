import lazy, { isLazy } from "src/utils/lazy";
import { anyValue } from "tests/utils";

test("resolve returns the producer's return value", () => {
  const ref = lazy(() => 42);
  expect(ref.resolve()).toEqual(42);
});

test("producer is not invoked until resolve is called", () => {
  const producer = jest.fn(() => "hello");
  const ref = lazy(producer);

  expect(producer).not.toHaveBeenCalled();

  ref.resolve();

  expect(producer).toHaveBeenCalledTimes(1);
});

test("subsequent resolve calls return the cached value without re-invoking the producer", () => {
  const producer = jest.fn(() => ({ id: 1 }));
  const ref = lazy(producer);

  const first = ref.resolve();
  const second = ref.resolve();
  const third = ref.resolve();

  expect(first).toBe(second);
  expect(second).toBe(third);
  expect(producer).toHaveBeenCalledTimes(1);
});

test("works with falsy resolved values without re-invoking the producer", () => {
  const undefinedProducer = jest.fn(() => undefined);
  const undefinedRef = lazy(undefinedProducer);

  expect(undefinedRef.resolve()).toBeUndefined();
  expect(undefinedRef.resolve()).toBeUndefined();
  expect(undefinedProducer).toHaveBeenCalledTimes(1);

  const nullProducer = jest.fn(() => null);
  const nullRef = lazy(nullProducer);

  expect(nullRef.resolve()).toBeNull();
  expect(nullRef.resolve()).toBeNull();
  expect(nullProducer).toHaveBeenCalledTimes(1);

  const zeroProducer = jest.fn(() => 0);
  const zeroRef = lazy(zeroProducer);

  expect(zeroRef.resolve()).toEqual(0);
  expect(zeroRef.resolve()).toEqual(0);
  expect(zeroProducer).toHaveBeenCalledTimes(1);
});

test("resolves classes, objects, arrays, and functions identically", () => {
  class Sample {}

  const cls = lazy(() => Sample);
  expect(cls.resolve()).toBe(Sample);

  const obj = lazy(() => ({ name: "Sample" }));
  expect(obj.resolve()).toEqual({ name: "Sample" });

  const arr = lazy(() => [1, 2, 3]);
  expect(arr.resolve()).toEqual([1, 2, 3]);

  const fn = lazy(() => () => "called");
  expect(fn.resolve()()).toEqual("called");
});

test("captures the variable binding, not its value at wrap time", () => {
  let target: string | undefined;

  const ref = lazy(() => target);

  // target was undefined at the moment lazy(...) ran
  target = "filled-in-later";

  expect(ref.resolve()).toEqual("filled-in-later");
});

test("propagates errors thrown by the producer and retries on next resolve call", () => {
  let shouldThrow = true;
  const producer = jest.fn(() => {
    if (shouldThrow) {
      throw new Error("boom");
    }
    return "recovered";
  });

  const ref = lazy(producer);

  expect(() => ref.resolve()).toThrow("boom");

  shouldThrow = false;

  expect(ref.resolve()).toEqual("recovered");
  expect(producer).toHaveBeenCalledTimes(2);
});

test("isLazy returns true for values produced by lazy()", () => {
  expect(isLazy(lazy(() => 1))).toEqual(true);
  expect(isLazy(lazy(() => "string"))).toEqual(true);
  expect(isLazy(lazy(() => null))).toEqual(true);
});

test("isLazy returns false for non-lazy values", () => {
  expect(isLazy(undefined)).toEqual(false);
  expect(isLazy(null)).toEqual(false);
  expect(isLazy(42)).toEqual(false);
  expect(isLazy("string")).toEqual(false);
  expect(isLazy(true)).toEqual(false);
  expect(isLazy({})).toEqual(false);
  expect(isLazy([])).toEqual(false);
  expect(isLazy(() => 1)).toEqual(false);
  expect(isLazy({ resolve: () => 1 })).toEqual(false);
  expect(isLazy(anyValue(Symbol("lazy")))).toEqual(false);
});

test("narrows the type when used as a guard", () => {
  const value: unknown = lazy(() => 42);

  if (isLazy<number>(value)) {
    expect(value.resolve()).toEqual(42);
  } else {
    fail("isLazy should have narrowed the value");
  }
});

test("isResolved returns false before resolve is called", () => {
  const ref = lazy(() => 42);
  expect(ref.isResolved()).toEqual(false);
});

test("isResolved returns true after resolve is called", () => {
  const ref = lazy(() => 42);
  ref.resolve();
  expect(ref.isResolved()).toEqual(true);
});

test("peek returns undefined before resolve is called and does not trigger the producer", () => {
  const producer = jest.fn(() => 42);
  const ref = lazy(producer);

  expect(ref.peek()).toBeUndefined();
  expect(producer).not.toHaveBeenCalled();
});

test("peek returns the cached value after resolve without re-invoking the producer", () => {
  const producer = jest.fn(() => ({ id: 1 }));
  const ref = lazy(producer);

  const resolved = ref.resolve();

  expect(ref.peek()).toBe(resolved);
  expect(ref.peek()).toBe(resolved);
  expect(producer).toHaveBeenCalledTimes(1);
});

test("reset clears the cached value and forces recomputation on next resolve", () => {
  const producer = jest.fn(() => ({ generation: producer.mock.calls.length + 1 }));
  const ref = lazy(producer);

  const first = ref.resolve();
  ref.reset();
  const second = ref.resolve();

  expect(first).not.toBe(second);
  expect(producer).toHaveBeenCalledTimes(2);
});

test("reset flips isResolved back to false and clears peek", () => {
  const ref = lazy(() => 42);
  ref.resolve();

  expect(ref.isResolved()).toEqual(true);
  expect(ref.peek()).toEqual(42);

  ref.reset();

  expect(ref.isResolved()).toEqual(false);
  expect(ref.peek()).toBeUndefined();
});

test("reset is a no-op before resolve has run", () => {
  const producer = jest.fn(() => 42);
  const ref = lazy(producer);

  ref.reset();
  ref.reset();

  expect(producer).not.toHaveBeenCalled();
  expect(ref.isResolved()).toEqual(false);
  expect(ref.peek()).toBeUndefined();
});

test("reset survives multiple cycles of resolve and reset", () => {
  let counter = 0;
  const ref = lazy(() => ++counter);

  expect(ref.resolve()).toEqual(1);
  ref.reset();
  expect(ref.resolve()).toEqual(2);
  ref.reset();
  expect(ref.resolve()).toEqual(3);
});

test("peek and isResolved disambiguate a resolved-to-undefined producer", () => {
  const ref = lazy(() => undefined);

  expect(ref.isResolved()).toEqual(false);
  expect(ref.peek()).toBeUndefined();

  ref.resolve();

  expect(ref.isResolved()).toEqual(true);
  expect(ref.peek()).toBeUndefined();
  // The caller distinguishes "not yet resolved" from "resolved to undefined"
  // by combining isResolved() with peek().
});
