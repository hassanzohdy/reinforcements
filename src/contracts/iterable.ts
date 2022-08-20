export default interface Iterable<T> {
  /**
   * Make the implemented class an iterable one that could be iterated over it.
   *
   * @returns {Array<any>}
   */
  [Symbol.iterator](): Iterator<T>;
}
