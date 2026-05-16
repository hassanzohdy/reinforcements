export type DebounceOptions = {
  /** Invoke on the leading edge of the wait window. Default: `false`. */
  leading?: boolean;
  /** Invoke on the trailing edge. Default: `true`. */
  trailing?: boolean;
  /** Maximum wait before forcing an invocation. */
  maxWait?: number;
};

export type Debounced<T extends (...args: any[]) => any> = ((
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void) & {
  /** Cancel any pending invocation. */
  cancel(): void;
  /** Invoke the pending call (if any) immediately. */
  flush(): void;
  /** Whether an invocation is currently pending. */
  pending(): boolean;
};

type Timer = ReturnType<typeof setTimeout>;

/**
 * Debounce `callback` so it only runs after `wait` ms have elapsed since
 * the last call. Supports leading/trailing edges, `maxWait`, and exposes
 * `cancel`/`flush`/`pending` controls.
 *
 * @example
 * const onSearch = debounce(query => fetch(query), 300);
 *
 * onSearch("hello");
 * onSearch("hello world"); // resets the timer
 * // …300 ms after the last call → invoked once with "hello world"
 */
export default function debounce<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
  options: DebounceOptions = {},
): Debounced<T> {
  const leading = options.leading ?? false;
  const trailing = options.trailing ?? true;
  const maxWait = options.maxWait;

  let trailingTimer: Timer | undefined;
  let maxWaitTimer: Timer | undefined;
  let pendingArgs: Parameters<T> | undefined;
  let pendingThis: any;
  let leadingFired = false;

  function invoke(): void {
    if (!pendingArgs) {
      return;
    }

    const args = pendingArgs;
    const thisArg = pendingThis;

    pendingArgs = undefined;
    pendingThis = undefined;

    callback.apply(thisArg, args);
  }

  function clearTrailing(): void {
    if (trailingTimer === undefined) {
      return;
    }

    clearTimeout(trailingTimer);
    trailingTimer = undefined;
  }

  function clearMaxWait(): void {
    if (maxWaitTimer === undefined) {
      return;
    }

    clearTimeout(maxWaitTimer);
    maxWaitTimer = undefined;
  }

  function onTrailingFired(): void {
    trailingTimer = undefined;
    clearMaxWait();

    if (trailing && pendingArgs) {
      invoke();
    }

    leadingFired = false;
  }

  function onMaxWaitFired(): void {
    maxWaitTimer = undefined;
    clearTrailing();

    if (pendingArgs) {
      invoke();
    }

    leadingFired = false;
  }

  function fireLeading(): void {
    leadingFired = true;
    invoke();
  }

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): void {
    pendingArgs = args;
    pendingThis = this;

    if (leading && !leadingFired) {
      fireLeading();
    }

    clearTrailing();
    trailingTimer = setTimeout(onTrailingFired, wait);

    if (maxWait !== undefined && maxWaitTimer === undefined) {
      maxWaitTimer = setTimeout(onMaxWaitFired, maxWait);
    }
  }

  debounced.cancel = () => {
    clearTrailing();
    clearMaxWait();

    pendingArgs = undefined;
    pendingThis = undefined;
    leadingFired = false;
  };

  debounced.flush = () => {
    if (trailingTimer === undefined && maxWaitTimer === undefined) {
      return;
    }

    clearTrailing();
    clearMaxWait();

    if (pendingArgs) {
      invoke();
    }

    leadingFired = false;
  };

  debounced.pending = () =>
    trailingTimer !== undefined || maxWaitTimer !== undefined;

  return debounced as Debounced<T>;
}
