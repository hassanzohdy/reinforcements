import Iterable from "./iterable";

export type ArrayCallback = (item: any, index: number, items: any[]) => boolean;

export default interface Collectable extends Iterable<unknown> {
  /**
   * Array length
   */
  readonly length: number;
  /**
   * Get min value of the array
   */
  min(key?: string): number;
  /**
   * Get max value of the array
   */
  max(key?: string): number;
  /**
   * Get the average value of the array or the given key
   */
  average(key?: string): number;
  /**
   * Alias for average
   */
  avg(key?: string): number;
  /**
   * Get the median value of the given key or array
   */
  median(key?: string): number;
  /**
   * Merge the given arrays to the current one
   */
  merge(...arrays: Array<unknown>[]): Collectable;
  /**
   * Merge the given arrays to the current one
   */
  concat(...arrays: Array<unknown>[]): Collectable;
  /**
   * Get the even values of the array or the given array of objects using the given key
   *
   * The key supports dot notation. syntax: "key1.key2.key3"
   */
  even(key?: string): Collectable;
  /**
   * Get the odd values of the array or the given array of objects using the given key
   *
   * The key supports dot notation. syntax: "key1.key2.key3"
   */
  odd(key?: string): Collectable;
  /**
   * Get even indexes of the array
   */
  evenIndexes(): Collectable;
  /**
   * Get odd indexes of the array
   */
  oddIndexes(): Collectable;
  /**
   * Get a unique array of values
   */
  unique(key?: string): Collectable;
  /**
   * Shift the first item from the array
   */
  shift(): unknown;
  /**
   * Unshift the given items to the beginning of the array
   */
  unshift(...items: unknown[]): Collectable;
  /**
   * Push one or more values to the array
   */
  push(...items: unknown[]): Collectable;
  /**
   * Push one or more values to the array if and
   * only if the value doesn't exists in the array
   */
  pushOnce(...items: unknown[]): Collectable;
  /**
   * Remove and get the last value of the array
   */
  pop(): unknown;
  /**
   * Get the last value of the array
   */
  end(): unknown;
  /**
   * Alias for end
   */
  last(): unknown;
  /**
   * Count data by the given key or callback
   */
  count(key: string | ArrayCallback): number;
  /**
   * Remove the first matched value with the given from the array
   */
  remove(value: ArrayCallback): Collectable;
  /**
   * Remove all matched values with the given value from the array
   * then reorder the array
   */
  removeAll(value: ArrayCallback): Collectable;
  /**
   * Get the first value for the given callback function
   * If no passed callback, return the first value
   */
  first(callback?: ArrayCallback): unknown;
  /**
   * Determine if the array includes the given value or callback
   */
  includes(value: unknown | ArrayCallback): boolean;
  /**
   * Alias for includes
   */
  contains(value: unknown | ArrayCallback): boolean;
  /**
   * Set the value of the given index
   */
  set(index: number, value: unknown): this;
  /**
   * Get the value of the given index
   */
  get(index: number): unknown;
  /**
   * Return an array containing all items
   */
  toArray(): Array<unknown>;
  /**
   * Convert the array to json
   */
  toJson(): string;
  /**
   * Map through the items using the given callback
   */
  map(callback: ArrayCallback): Collectable;
  /**
   * Walk through each element of the array and execute the given callback on it
   */
  forEach(callback: ArrayCallback): Collectable;
  /**
   * Alias for forEach
   */
  each(callback: ArrayCallback): Collectable;
  /**
   * Filter the array using the given callback
   */
  filter(callback: ArrayCallback): Collectable;
  /**
   * Sort the array by the given callback, if no passed callback, use default sorting
   */
  sort(callback?: ArrayCallback): Collectable;
  /**
   * Sort the array by the given key in ascendant order, this works only with arrays of objects
   */
  sortBy(key: string): Collectable;
  /**
   * Sort the array by the given key in descendant order, this works only with arrays of objects
   */
  sortByDesc(key: string): Collectable;
  /**
   * Get all values except for the given matched callback
   */
  reject(callback: ArrayCallback): Collectable;
  /**
   * Alias to reject
   */
  except(callback: ArrayCallback): Collectable;
  /**
   * Execute a reducer function (that you provide) on each element of the array, resulting in a single output value.
   */
  reduce: typeof Array.prototype.reduce;
  /**
   * Chunk the array into groups of arrays based on the given size
   */
  chunk(size: number): Collectable;
  /**
   * Clone the array into another new Collectable instance
   */
  clone(): Collectable;
  /**
   * Make a new instance of Collectable
   */
  collect(items: unknown[]): Collectable;
  /**
   * Reverse the order of the array
   */
  reverse(): Collectable;
  /**
   * Skip the given number of items from the beginning array
   */
  skip(number: number): Collectable;
  /**
   * Skip the given number of items from the end of array
   */
  skipLast(number: number): Collectable;
  /**
   * Skip until the given callback returns true or for the given value
   */
  skipUntil(callback: ArrayCallback | number | string): Collectable;
  /**
   * Skip while the given callback returns true
   */
  skipWhile(callback: ArrayCallback): Collectable;
  /**
   * Get the first index of the given value
   */
  indexOf: typeof Array.prototype.indexOf;
  /**
   * Get the last index of the given value
   */
  lastIndexOf: typeof Array.prototype.lastIndexOf;
  /**
   * Determine if the array is empty
   */
  isEmpty(): boolean;
  /**
   * Determine if the array is not empty
   */
  isNotEmpty(): boolean;
  /**
   * Get random value from the array
   */
  random(): unknown;
  /**
   * Replace the first matched value with the given value from the array to the new value
   */
  replace(oldValue: unknown, newValue: unknown): Collectable;
  /**
   * Replace all matched values with the given value from the array to the new value
   */
  replaceAll(oldValue: unknown, newValue: unknown): Collectable;
  /**
   * Shuffle array items
   */
  shuffle(): Collectable;
  /**
   * Slice the array based on the given beginning and end value
   */
  slice(begin?: number, end?: number): Collectable;
  /**
   * Alias for slice
   */
  take(number: number): Collectable;
  /**
   * Take the given number of items from the end of array
   */
  takeLast(number: number): Collectable;
  /**
   * Take until the given callback returns true or for the given value
   */
  takeUntil(callback: ArrayCallback | number | string): Collectable;
  /**
   * Tap the array and pass it to the given callback while not modifying it
   */
  tap(callback: ArrayCallback): this;
  /**
   * Slice the array based on the given beginning and end value
   */
  splice(start: number, deleteCount?: number, ...items: unknown[]): Collectable;
  /**
   * Tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
   */
  some(callback: ArrayCallback): Collectable;
  /**
   * Tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value
   */
  every(callback: ArrayCallback): Collectable;
  /**
   * Remove all values from the array for the given keys
   * then reorder the array
   */
  unset(...keys: number[]): Collectable;
  /**
   * Pluck a column of value form array of objects
   * The key should implement dot notation syntax.
   */
  pluck(key: string | string[]): Collectable;
  /**
   * Filter the items using the given criteria
   * The key should implement dot notation syntax.
   * This method accepts two or three arguments
   * If two arguments passed, then the operator parameter will be the value parameter and the operator will be equal
   *
   * Available operators: `=`, `>`, `>=`, `<>`, `!=`, `<`, `<=`
   */
  where(key: string, operator: unknown, value: unknown): Collectable;
  /**
   * Filter the items when the given key's value is one of the given values
   */
  whereIn(key: string, values: unknown[]): Collectable;
  /**
   * Get all items except the callback
   */
  whereNot(callback: ArrayCallback): Collectable;
  /**
   * Get all items where between the given values
   */
  whereBetween(key: string, values: unknown[]): Collectable;
  whereBetween(values: unknown[]): Collectable;
  /**
   * Get all items where not between the given values
   */
  whereNotBetween(key: string, values: unknown[]): Collectable;
  whereNotBetween(values: unknown[]): Collectable;
  /**
  /**
   * Get all items that are not empty
   * Empty values are `null`, `undefined`, `''`, `[]`, `{}`
   */
  whereNotEmpty(key?: string): Collectable;
  /**
   * Get all items that are not null
   */
  whereNotNull(key?: string): Collectable;
  /**
   * Get first value based on given filtration options
   */
  firstWhere(key: unknown, operator?: unknown, value?: unknown): unknown;
  /**
   * Get first value based on given filtration callback
   */
  firstWhere(callback: ArrayCallback): unknown;
  /**
   * Group Array by key(s)
   *
   * Key(s) supports dot notation syntax
   */
  groupBy(keys: string | string[]): Collectable;
}
