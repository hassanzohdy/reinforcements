/**
 * Maximum nesting depth the recursive helpers accept. Deeper input
 * (for example an 18 kB `JSON.parse` payload nested 3000 levels) would
 * otherwise overflow the call stack.
 */
const MAX_NESTING_DEPTH = 256;

/**
 * Thrown by the recursive helpers (`clone`, `merge`, `compact`, `flatten`,
 * `sort`, `walk`, `freeze`, `areEqual`, `diff`) when the input is nested
 * deeper than 256 levels or, for the helpers that cannot represent
 * cycles, contains a circular reference.
 */
export class NestingError extends RangeError {
  public constructor(message: string) {
    super(message);

    this.name = "NestingError";
  }
}

/**
 * Internal helper: throw a descriptive `NestingError` when `depth`
 * exceeds the limit. For helpers that track depth with a counter.
 */
export function assertDepth(depth: number, helper: string): void {
  if (depth > MAX_NESTING_DEPTH) {
    throw new NestingError(
      `${helper}: input is nested deeper than ${MAX_NESTING_DEPTH} levels`,
    );
  }
}

/**
 * Internal helper: tracks the chain of objects currently being visited.
 * `enter` throws a `NestingError` when the chain is longer than the
 * limit or when the same object appears twice in it (a cycle). Objects
 * that are merely shared between siblings are fine.
 */
export class NestingGuard {
  private readonly ancestors = new Set<object>();

  public constructor(private readonly helper: string) {}

  public enter(value: object): void {
    if (this.ancestors.has(value)) {
      throw new NestingError(`${this.helper}: circular reference detected`);
    }

    assertDepth(this.ancestors.size + 1, this.helper);

    this.ancestors.add(value);
  }

  public leave(value: object): void {
    this.ancestors.delete(value);
  }
}
