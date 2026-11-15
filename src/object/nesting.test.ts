import areEqual from "../mixed/areEqual/areEqual";
import clone from "../mixed/clone/clone";
import compact from "./compact";
import diff from "./diff";
import flatten from "./flatten";
import freeze from "./freeze";
import merge from "./merge";
import sort from "./sort";
import walk from "./walk";

/** `levels` nested plain objects: `{ a: { a: ... { a: 1 } } }`. */
const nested = (levels: number) =>
  JSON.parse('{"a":'.repeat(levels) + "1" + "}".repeat(levels));

// Each helper gets fresh, independent trees of `levels` levels. `diff`
// compares values one level down (through `areEqual`), so it is handed
// the tree as a child.
const helpers: Array<[string, (levels: number) => unknown]> = [
  ["clone", levels => clone(nested(levels))],
  ["merge", levels => merge(nested(levels), nested(levels))],
  ["compact", levels => compact(nested(levels))],
  ["flatten", levels => flatten(nested(levels))],
  ["sort", levels => sort(nested(levels))],
  ["walk", levels => walk(nested(levels), () => undefined)],
  ["freeze", levels => freeze(nested(levels))],
  ["areEqual", levels => areEqual(nested(levels), nested(levels))],
  ["diff", levels => diff({ x: nested(levels) }, { x: nested(levels) })],
];

describe("reinforcements/object/nesting (256-level limit)", () => {
  it.each(helpers)("%s accepts exactly 256 levels", (_, helper) => {
    expect(() => helper(256)).not.toThrow();
  });

  it.each(helpers)("%s throws a NestingError past 256 levels", (_, helper) => {
    const run = () => helper(257);

    expect(run).toThrow(RangeError);
    expect(run).toThrow(/nested deeper than 256 levels/);

    try {
      run();
    } catch (error: any) {
      expect(error.name).toBe("NestingError");
    }
  });
});
