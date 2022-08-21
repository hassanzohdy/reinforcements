export default class Collection {
  /**
   * Items list
   */
  protected items: unknown[] = [];

  /**
   * Array length
   */
  public get length(): number {
    return this.items.length;
  }
}
