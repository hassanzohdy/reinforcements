export type ThrottleOptions = {
  /** Invoke on the leading edge. Default: `true`. */
  leading?: boolean;
  /** Invoke on the trailing edge after the wait window. Default: `true`. */
  trailing?: boolean;
};

export type Throttled<T extends (...args: any[]) => any> = ((
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void) & {
  cancel(): void;
  flush(): void;
  pending(): boolean;
};

type Timer = ReturnType<typeof setTimeout>;

/**
 * Throttle `callback` so it runs at most once every `wait` ms. Trailing
 * invocations fire with the most recent arguments.
 *
 * @example
 * const onScroll = throttle(() => layout(), 100);
 *
 * window.addEventListener("scroll", onScroll);
 */
export default function throttle<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
  options: ThrottleOptions = {},
): Throttled<T> {
  const leading = options.leading ?? true;
  const trailing = options.trailing ?? true;

  let trailingTimer: Timer | undefined;
  let lastInvoked = 0;
  let pendingArgs: Parameters<T> | undefined;
  let pendingThis: any;

  function invoke(now: number): void {
    lastInvoked = now;

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

  function throttled(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): void {
    const now = Date.now();

    if (!lastInvoked && !leading) {
      lastInvoked = now;
    }

    const remaining = wait - (now - lastInvoked);

    pendingArgs = args;
    pendingThis = this;

    if (remaining <= 0 || remaining > wait) {
      clearTrailing();
      invoke(now);

      return;
    }

    if (trailingTimer === undefined && trailing) {
      trailingTimer = setTimeout(() => {
        trailingTimer = undefined;
        invoke(leading ? Date.now() : 0);
      }, remaining);
    }
  }

  throttled.cancel = () => {
    clearTrailing();

    lastInvoked = 0;
    pendingArgs = undefined;
    pendingThis = undefined;
  };

  throttled.flush = () => {
    if (trailingTimer === undefined) {
      return;
    }

    clearTrailing();
    invoke(Date.now());
  };

  throttled.pending = () => trailingTimer !== undefined;

  return throttled as Throttled<T>;
}
