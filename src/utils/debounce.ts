let timeoutId: NodeJS.Timeout | undefined;

type DebounceFn<T extends (...args: any[]) => any> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;

/**
 * Debounce the callback function and return a new function.
 * Example of usage:
 * @example const debounced = debounce(() => console.log('Hello'), 1000);
 */
export default function debounce<T extends (...args: any[]) => any>(
  callback: T,
  time: number,
): DebounceFn<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, time);
  };
}
