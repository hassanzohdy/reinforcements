import Arrayable from "./contracts/arrayable";
import Obj from "./obj";

declare type ArrayType = number | string | object | any;
declare type ArrayCallback<T> = (value: T, index: number, array: T[]) => any;

function values(array: Array<ArrayType>): Array<ArrayType> {
  const newArray = [];
  newArray.push(...array);
  return newArray;
}

function defaultIndexFilter(arrayValue: any, comingValue: any): boolean {
  return Object.is(arrayValue, comingValue);
}

export default class Arr<T> implements Arrayable<T> {
  /**
   * Counter of array;
   *
   * @type {number}
   */
  private counter = 0;

  /**
   * {@inheritdoc}
   */
  private items: Array<ArrayType> = [];

  /**
   * Constructor
   *
   * @param {array} items
   */
  public constructor(items: Array<ArrayType> = []) {
    this.items = items;
  }

  /**
   * {@inheritdoc}
   */
  public min(key?: string): number {
    if (!key) return Math.min(...this.items);

    let minValue: number = Number.MIN_VALUE;

    for (const item of this.items) {
      if (item !== null && typeof item === "object") continue;

      let itemValue = Number(Obj.get(item, key));

      if (isNaN(itemValue)) continue;

      itemValue = Number(itemValue);

      if (itemValue < minValue) {
        minValue = itemValue;
      }
    }

    return minValue;
  }

  /**
   * {@inheritdoc}
   */
  public max(key?: string): number {
    if (!key) return Math.max(...this.items);

    let maxValue: number = Number.MAX_VALUE;

    for (const item of this.items) {
      if (item !== null && typeof item === "object") continue;

      const itemValue = Number(Obj.get(item, key));

      if (isNaN(itemValue)) continue;

      if (itemValue > maxValue) {
        maxValue = itemValue;
      }
    }

    return maxValue;
  }

  /**
   * {@inheritdoc}
   */
  public avg(key?: string): number {
    return (
      this.items.reduce((total: number, item: any) => {
        return total + (!key ? item : Obj.get(item, key));
      }, Number.MIN_VALUE) / this.items.length
    );
  }

  /**
   * {@inheritdoc}
   */
  public average(key?: string): number {
    return this.avg(key);
  }

  /**
   * {@inheritdoc}
   */
  public merge(...arrays: any[][]): Arrayable<T> {
    return new Arr(this.items.concat(...arrays));
  }

  /**
   * Merge all unique values from all of the given array with current
   * array and return new one
   *
   * @param    {...array} arrays
   * @returns {Arrayable<T>}
   */
  public mergeUnique(...arrays: any[][]): Arrayable<T> {
    return this.merge(...arrays).unique();
  }

  /**
   * {@inheritdoc}
   */
  public concat(...arrays: any[][]): Arrayable<T> {
    return this.merge(...arrays);
  }

  /**
   * Get the value of the given index
   *
   * @param {number} index
   * @returns {Arrayable}
   */
  set(index: number, value: any): any {
    this.items[index] = value;

    return this;
  }

  /**
   * Get the value of the given index
   *
   * @param {number} index
   * @returns {*}
   * @memberof Arr
   */
  get(index: number): any {
    return this.items[index];
  }

  /**
   * {@inheritdoc}
   */
  public unique(key?: string): Arrayable<T> {
    const newItems: Arrayable<T> = new Arr();

    for (const item of this.items) {
      newItems.pushOnce(key ? Obj.get(item, key) : item);
    }

    return newItems;
  }

  /**
   * Toggle the given value using the given callback
   *
   *
   * @param {any} value
   * @param {boolean} toggleIn
   * @param {Function} indexFilter
   * @returns {Array}
   */
  public toggle(
    value: any,
    toggleIn: boolean,
    indexFilter: Function = defaultIndexFilter,
  ): Arrayable<T> {
    const array = this.items;

    if (toggleIn === true) {
      if (array.includes(value)) return this;

      array.push(value);
    } else {
      const valueIndex = array.findIndex(arrayValue =>
        indexFilter(arrayValue, value),
      );

      array.splice(valueIndex, 1);
    }

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public shift(): any {
    return this.items.shift();
  }

  /**
   * {@inheritdoc}
   */
  unshift(...items: any[]): Arrayable<T> {
    this.items.unshift(...items);
    return this;
  }

  /**
   * {@inheritdoc}
   */
  public push(...items: any[]): Arrayable<T> {
    this.items.push(...items);

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public pushOnce(...items: any[]): Arrayable<T> {
    for (const item of items) {
      if (!this.items.includes(item)) {
        this.items.push(item);
      }
    }

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public pop(): any {
    return this.items.pop();
  }

  /**
   * {@inheritdoc}
   */
  public end(): any {
    return this.items[this.length - 1];
  }

  /**
   * {@inheritdoc}
   */
  public remove(value: any): Arrayable<T> {
    let found = false;
    this.items = this.items.filter(item => {
      if (found) return true;

      if (item === value) {
        found = true;
        return false;
      }

      return true;
    });

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public removeAll(value: any): Arrayable<T> {
    this.items = this.items.filter(item => item != value);

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public first(key?: Function): any {
    if (key === undefined) return this.items[0];

    const callback: Function = key as Function;

    for (let i = 0; i < this.length; i++) {
      const item = this.items[i];

      if (callback(item, i) === true) return item;
    }

    return null;
  }

  /**
   * {@inheritdoc}
   */
  public includes(value: any): boolean {
    return this.items.includes(value);
  }

  /**
   * {@inheritdoc}
   */
  public toArray(): any[] {
    return this.items;
  }

  /**
   * {@inheritdoc}
   */
  public map<T>(callback: ArrayCallback<T>): Arrayable<T> {
    return new Arr(this.items.map(callback));
  }

  /**
   * {@inheritdoc}
   */
  public forEach(callback: ArrayCallback<T>): void {
    this.items.forEach(callback);
  }

  /**
   * {@inheritdoc}
   */
  public filter(callback: ArrayCallback<T>): Arrayable<T> {
    return new Arr(this.items.filter(callback));
  }

  /**
   * {@inheritdoc}
   */
  public sort(callback?: (a: number, b: number) => number): Arrayable<T> {
    return new Arr(this.items.sort(callback));
  }

  /**
   * {@inheritdoc}
   */
  public sortBy(valueOrFunction: string | Function): Arrayable<T> {
    const collection = this.items.concat([]);

    const isFunction = typeof valueOrFunction === "function";

    const getValue = (item: any) => {
      if (isFunction) {
        return (valueOrFunction as Function)(item);
      }

      return Obj.get(item, valueOrFunction as string);
    };

    collection.sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      if (valueA === null || valueA === undefined) {
        return 1;
      }

      if (valueB === null || valueB === undefined) {
        return -1;
      }

      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }

      return 0;
    });

    return new Arr(collection);
  }

  /**
   * {@inheritdoc}
   */
  public sortByDesc(key: string | Function): Arrayable<T> {
    return this.sortBy(key).reverse();
  }

  /**
   * {@inheritdoc}
   */
  public reduce(callback: Function, initialValue?: any) {
    this.items.forEach(item => {
      initialValue = callback(initialValue, item);
    });

    return initialValue;
  }

  /**
   * {@inheritdoc}
   */
  public chunk(size: number): Arrayable<T> {
    const chunks = [];
    let index = 0;

    do {
      const items = this.items.slice(index, index + size);
      const collection = new Arr(items);

      chunks.push(collection);
      index += size;
    } while (index < this.items.length);

    return new Arr(chunks);
  }

  /**
   * {@inheritdoc}
   */
  public clone(): Arrayable<T> {
    return new Arr(Array.from(this.items));
  }

  /**
   * {@inheritdoc}
   */
  public reverse(): Arrayable<T> {
    return new Arr(this.items.reverse());
  }

  /**
   * {@inheritdoc}
   */
  public indexOf(value: any): number {
    return this.items.indexOf(value);
  }

  /**
   * {@inheritdoc}
   */
  public lastIndexOf(value: any): number {
    return this.items.lastIndexOf(value);
  }

  /**
   * {@inheritdoc}
   */
  public isEmpty(): boolean {
    return 0 === this.length;
  }

  /**
   * {@inheritdoc}
   */
  public isNotEmpty(): boolean {
    return false === this.isEmpty();
  }

  /**
   * {@inheritdoc}
   */
  public random(): any {
    return this.shuffle().first();
  }

  /**
   * {@inheritdoc}
   */
  public replace(oldValue: any, newValue: any): Arrayable<T> {
    for (let i = 0; i < this.length; i++) {
      const item: any = this.get(i);

      if (item === oldValue) {
        this.set(i, newValue);
        break;
      }
    }

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public replaceAll(oldValue: any, newValue: any): Arrayable<T> {
    for (let i = 0; i < this.length; i++) {
      const item: any = this.get(i);

      if (item === oldValue) {
        this.set(i, newValue);
      }
    }

    return this;
  }

  /**
   * {@inheritdoc}
   */
  public shuffle(): Arrayable<T> {
    const items = this.clone();

    let j: any;
    let x: any;
    let i: number;

    for (i = items.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = items.get(i - 1);
      items.set(i - 1, items.get(j));
      items.set(j, x);
    }

    return items;
  }

  /**
   * {@inheritdoc}
   */
  public slice(
    begin?: number | undefined,
    end?: number | undefined,
  ): Arrayable<T> {
    return new Arr(this.items.slice(begin, end));
  }

  /**
   * {@inheritdoc}
   */
  public splice(start: number, deleteCount: number, ...items: T[]): any {
    const removedItems = this.items.splice(start, deleteCount, ...items);
    return removedItems;
  }

  /**
   * {@inheritdoc}
   */
  public some(
    callback: (value: T, index: number, array: T[]) => unknown,
  ): boolean {
    return this.items.some(callback);
  }

  /**
   * {@inheritdoc}
   */
  public every(
    callback: (value: T, index: number, array: T[]) => unknown,
  ): boolean {
    return this.items.every(callback);
  }

  /**
   * {@inheritdoc}
   */
  public unset(...keys: number[]): void {
    for (const key of keys) {
      this.items.splice(key, 1);
    }
  }

  /**
   * {@inheritdoc}
   */
  public off(event: string | string[]) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public pluck(key: string): Arrayable<T> {
    const data: Arr<T> = new Arr();

    for (const item of this.items) {
      data.pushOnce(Obj.get(item, key));
    }

    return data;
  }

  /**
   * {@inheritdoc}
   */
  public where(
    key: string,
    operator: any = null,
    value: any = null,
  ): Arrayable<T> {
    let comparisonOperator = operator;
    let comparisonValue = value;

    const items: Array<any> = values(this.items);

    if (operator === undefined || operator === true) {
      return new Arr(items.filter((item: any) => Obj.get(item, key)));
    }

    if (operator === false) {
      return new Arr(items.filter((item: any) => !Obj.get(item, key)));
    }

    if (value === null) {
      comparisonValue = operator;
      comparisonOperator = "===";
    }

    const collection = items.filter((item: any) => {
      switch (comparisonOperator) {
        case "==":
          return (
            Obj.get(item, key) === Number(comparisonValue) ||
            Obj.get(item, key) === comparisonValue.toString()
          );

        default:
        case "===":
          return Obj.get(item, key) === comparisonValue;

        case "!=":
        case "<>":
          return (
            Obj.get(item, key) !== Number(comparisonValue) &&
            Obj.get(item, key) !== comparisonValue.toString()
          );

        case "!==":
          return Obj.get(item, key) !== comparisonValue;

        case "<":
          return Obj.get(item, key) < comparisonValue;

        case "<=":
          return Obj.get(item, key) <= comparisonValue;

        case ">":
          return Obj.get(item, key) > comparisonValue;

        case ">=":
          return Obj.get(item, key) >= comparisonValue;
      }
    });

    return new Arr(collection);
  }

  /**
   * {@inheritdoc}
   */
  firstWhere(key: any, operator: any, value?: any): any {
    return this.where(key, operator, value).first() || null;
  }

  /**
   * {@inheritdoc}
   */
  public get length(): number {
    return this.items.length;
  }

  /**
   * Get last value based on given function callback
   */
  last(fn: any, defaultValue: any) {
    let items: Arrayable<T> = this.clone();

    const isFunction = typeof fn === "function";

    if (isFunction) {
      items = items.filter(fn);
    }

    if (items.isEmpty() && isFunction) {
      return defaultValue();
    }

    return items.end();
  }

  /**
   * {@inheritdoc}
   */
  public on(event: string | string[], callback: Function) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public once(event: string | string[], callback: Function) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public subscribe(event: string | string[], callback: Function) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public trigger(event: string | string[], ...values: any[]) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public emit(event: string | string[], ...values: any[]) {
    throw new Error("Method not implemented.");
  }

  /**
   * {@inheritdoc}
   */
  public [Symbol.iterator](): Iterator<ArrayType> {
    this.counter = 0;
    return {
      next: (): IteratorResult<ArrayType> => {
        return {
          done: this.length === this.counter,
          value: this.items[this.counter++],
        };
      },
    };
  }
}
