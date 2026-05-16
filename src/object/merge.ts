import isPlainObject from "./isPlainObject";

export type MergeArrayStrategy = "replace" | "concat" | "union";

export type MergeOptions = {
  /** How to combine arrays. Default: `"replace"`. */
  arrays?: MergeArrayStrategy;
};

const DEFAULT_OPTIONS: Required<MergeOptions> = {
  arrays: "replace",
};

/**
 * Deep-merge two or more values. Plain objects merge recursively; arrays
 * are combined according to `options.arrays`. Non-plain objects (Dates,
 * class instances, Maps, Sets, etc.) are taken from the latest source.
 *
 * Pass a `MergeOptions` object as the final argument to configure array
 * handling. The trailing options object is detected automatically — only
 * when its single own key is `arrays`.
 *
 * @example
 * merge({ a: { b: 1 } }, { a: { c: 2 } }); // { a: { b: 1, c: 2 } }
 * merge({ list: [1] }, { list: [2] }, { arrays: "concat" }); // { list: [1, 2] }
 */
export default function merge<T extends object, U extends object>(
  target: T,
  source: U,
): T & U;
export default function merge(...args: any[]): any;
export default function merge(...args: any[]): any {
  if (args.length === 0) {
    return undefined;
  }

  const { sources, options } = extractOptions(args);

  if (sources.length === 0) {
    return undefined;
  }

  if (sources.length === 1) {
    return sources[0];
  }

  let result = sources[0];

  for (let i = 1; i < sources.length; i++) {
    result = mergeTwo(result, sources[i], options);
  }

  return result;
}

function extractOptions(args: any[]): {
  sources: any[];
  options: Required<MergeOptions>;
} {
  const last = args[args.length - 1];
  const isOptionsObject =
    isPlainObject(last) &&
    "arrays" in last &&
    Object.keys(last).length === 1;

  if (isOptionsObject) {
    return {
      sources: args.slice(0, -1),
      options: { ...DEFAULT_OPTIONS, ...(last as MergeOptions) },
    };
  }

  return {
    sources: args,
    options: DEFAULT_OPTIONS,
  };
}

function mergeTwo(
  target: any,
  source: any,
  options: Required<MergeOptions>,
): any {
  if (source === undefined) {
    return target;
  }

  if (target === undefined || target === null) {
    return source;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    return mergeArrays(target, source, options.arrays);
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    return mergePlainObjects(target, source, options);
  }

  return source;
}

function mergeArrays(
  target: any[],
  source: any[],
  strategy: MergeArrayStrategy,
): any[] {
  switch (strategy) {
    case "concat":
      return [...target, ...source];

    case "union":
      return Array.from(new Set([...target, ...source]));

    case "replace":
    default:
      return [...source];
  }
}

function mergePlainObjects(
  target: Record<string, any>,
  source: Record<string, any>,
  options: Required<MergeOptions>,
): Record<string, any> {
  const result: Record<string, any> = { ...target };

  for (const key of Object.keys(source)) {
    result[key] = mergeTwo(target[key], source[key], options);
  }

  return result;
}
