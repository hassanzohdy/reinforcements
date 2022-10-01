import Is from "@mongez/supportive-is";
import countBy from "src/array/countBy";
import prependUnique from "src/array/prependUnique";
import average from "../array/average";
import chunk from "../array/chunk";
import count from "../array/count";
import even from "../array/even";
import evenIndexes from "../array/evenIndexes";
import groupBy from "../array/groupBy";
import max from "../array/max";
import median from "../array/median";
import min from "../array/min";
import odd from "../array/odd";
import oddIndexes from "../array/oddIndexes";
import pluck from "../array/pluck";
import pushUnique from "../array/pushUnique";
import sum from "../array/sum";
import unique from "../array/unique";
import areEqual from "../mixed/areEqual/areEqual";
import shuffle from "../mixed/shuffle/shuffle";
import get from "../object/get";
import set from "../object/set";
import { ComparisonOperator, Operators } from "../types";

const NotExists = Symbol("NotExists");

export default class ImmutableCollection {
  /**
   * Items list
   */
  public items: any[] = [];

  /**
   * Constructor
   */
  public constructor(items: any[] | ImmutableCollection = []) {
    if (items instanceof ImmutableCollection) {
      this.items = [...items.toArray()];
    } else {
      this.items = [...items];
    }
  }

  /**
   * Create collection from iterator
   */
  public static fromIterator(iterator: Iterable<any>) {
    return new ImmutableCollection([...iterator]);
  }

  /**
   * Array length
   */
  public get length(): number {
    return this.items.length;
  }

  /**
   * Get items indexes
   */
  public indexes() {
    return new ImmutableCollection(Object.keys(this.items).map(Number));
  }

  /**
   * Get items keys (indexes) as collection of string
   */
  public keys() {
    return ImmutableCollection.fromIterator(this.items.keys());
  }

  /**
   * Get items values
   */
  public values() {
    return ImmutableCollection.fromIterator(this.items.values());
  }

  /**
   * Get items entries
   */
  public entries() {
    return ImmutableCollection.fromIterator(this.items.entries());
  }

  /**
   * Get min value of current items or the given key
   */
  public min(key?: string): number {
    return min(this.items, key);
  }

  /**
   * Get max value of current items or the given key
   */
  public max(key?: string): number {
    return max(this.items, key);
  }

  /**
   * Sum the collection or the value of the given key
   */
  public sum(key?: string) {
    return sum(this.items, key);
  }

  /**
   * Get average value of current items or the given key
   */
  public average(key?: string): number {
    return average(this.items, key);
  }

  /**
   * @alias average
   */
  public avg(key?: string): number {
    return average(this.items, key);
  }

  /**
   * Get median value of current items or the given key
   */
  public median(key?: string): number {
    return median(this.items, key);
  }

  /**
   * Add the given amount to each element or given key in each element
   */
  public plus(amount: number);
  public plus(key: string, amount: number);
  public plus(...args: any[]) {
    let [key, amount] = args;
    if (args.length === 1) {
      amount = key;
      key = null;
    }

    return this.map(item => {
      if (key) {
        return set(item, key, get(item, key) + amount);
      }

      return item + amount;
    });
  }

  /**
   * Increment the given key in each element or the element by 1
   */
  public increment(key?: string) {
    return key ? this.plus(key, 1) : this.plus(1);
  }

  /**
   * Decrease the given amount to each element or given key in each element
   */
  public minus(amount: number);
  public minus(key: string, amount: number);
  public minus(...args: any[]) {
    let [key, amount] = args;
    if (args.length === 1) {
      amount = key;
      key = null;
    }

    return this.map(item => {
      if (key) {
        return set(item, key, get(item, key) - amount);
      }

      return item - amount;
    });
  }

  /**
   * Decrement the given key in each element or the element by 1
   */
  public decrement(key?: string) {
    return key ? this.minus(key, 1) : this.minus(1);
  }

  /**
   * Multiple the given amount to each element or given key in each element
   */
  public multiply(amount: number);
  public multiply(key: string, amount: number);
  public multiply(...args: any[]) {
    let [key, amount] = args;
    if (args.length === 1) {
      amount = key;
      key = null;
    }

    return this.map(item => {
      if (key) {
        return set(item, key, Number(get(item, key)) * amount);
      }

      return item * amount;
    });
  }

  /**
   * Divide the given amount to each element or given key in each element
   */
  public divide(amount: number);
  public divide(key: string, amount: number);
  public divide(...args: any[]) {
    let [key, amount] = args;

    if (args.length === 1) {
      amount = key;
      key = null;
    }

    if (amount === 0) {
      throw new Error("Cannot divide by zero");
    }

    return this.map(item => {
      if (key) {
        return set(item, key, get(item, key) / amount);
      }

      return item / amount;
    });
  }

  /**
   * Append string to each element or given key in each element
   */
  public appendString(string: string, key?: string) {
    return this.map(item => {
      if (key) {
        return set(item, key, get(item, key) + string);
      }

      return item + string;
    });
  }

  /**
   * Prepend string to each element or given key in each element
   */
  public prependString(string: string, key?: string) {
    return this.map(item => {
      if (key) {
        return set(item, key, string + get(item, key));
      }

      return string + item;
    });
  }

  /**
   * Merge the given arrays with current array and return new ImmutableCollection
   */
  public merge(...arrays: any[][]) {
    return new ImmutableCollection(this.items.concat(arrays.flat()));
  }

  /**
   * @alias merge
   */
  public concat(...arrays: any[][]) {
    return this.merge(...arrays);
  }

  /**
   * Reduce the array to a single value
   */
  public reduce(...args: Parameters<typeof Array.prototype.reduce>) {
    return this.items.reduce(...args);
  }

  /**
   * Reduce the array to a single value from the right (last to first)
   */
  public reduceRight(...args: Parameters<typeof Array.prototype.reduceRight>) {
    return this.items.reduceRight(...args);
  }

  /**
   * Flat the items
   */
  public flat(depth: number = 1) {
    return new ImmutableCollection(this.items.flat(depth));
  }

  /**
   * Flat Map the items
   */
  public flatMap(callback: Parameters<typeof Array.prototype.flatMap>[0]) {
    return new ImmutableCollection(this.items.flatMap(callback));
  }

  /**
   * Get every items in the array
   */
  public even(key?: string) {
    return new ImmutableCollection(even(this.items, key));
  }

  /**
   * Get odd items in the array
   */
  public odd(key?: string) {
    return new ImmutableCollection(odd(this.items, key));
  }

  /**
   * Get items in even indexes
   */
  public evenIndexes() {
    return new ImmutableCollection(evenIndexes(this.items));
  }

  /**
   * Get items in odd indexes
   */
  public oddIndexes() {
    return new ImmutableCollection(oddIndexes(this.items));
  }

  /**
   * Get unique items in the array
   */
  public unique(key?: string) {
    return new ImmutableCollection(unique(this.items, key));
  }

  /**
   * Remove and return the first item in the array
   */
  public shift() {
    return this.items.shift();
  }

  /**
   * Add the given items to the beginning of the array
   */
  public unshift(...items: any[]) {
    const currentItems = [...this.items];
    currentItems.unshift(...items);
    return new ImmutableCollection(currentItems);
  }

  /**
   * @alias unshift
   */
  public prepend(...items: any[]) {
    return this.unshift(...items);
  }

  /**
   * Prepend unique values to the array
   */
  public prependUnique(...items: any[]) {
    const currentItems = [...this.items];
    prependUnique(currentItems, ...items);
    return new ImmutableCollection(currentItems);
  }

  /**
   * @alias prependUnique
   */
  public unshiftUnique(...items: any[]) {
    return this.prependUnique(...items);
  }

  /**
   * Add the given items to the end of the array
   */
  public push(...items: any[]) {
    const currentItems = [...this.items];
    currentItems.push(...items);
    return new ImmutableCollection(currentItems);
  }

  /**
   * @alias push
   */
  public append(...items: any[]) {
    return this.push(...items);
  }

  /**
   * Get items that are not in the given indexes
   */
  public exceptIndexes(...indexes: number[]) {
    return new ImmutableCollection(
      this.items.filter((_, index) => !indexes.includes(index)),
    );
  }

  /**
   * Add the given items to the end of the array only if they don't exist
   */
  public pushUnique(...items: any[]) {
    const currentItems = [...this.items];
    pushUnique(currentItems, ...items);
    return new ImmutableCollection(currentItems);
  }

  /**
   * Remove and return the last item in the array
   */
  public pop() {
    return this.items.pop();
  }

  /**
   * Get last item in the array
   */
  public last() {
    return this.items[this.items.length - 1];
  }

  /**
   * @alias last
   */
  public end() {
    return this.last();
  }

  /**
   * Count how many items in the array based on the given key or callback
   */
  public count(
    key: string | Parameters<typeof Array.prototype.filter>[0],
  ): number {
    return count(this.items, key);
  }

  /**
   * Count by the given key total occurrences
   */
  public countBy(key: string) {
    return countBy(this.items, key);
  }

  /**
   * Remove the first item from the array
   */
  public remove(value: Parameters<typeof Array.prototype.indexOf>[0]) {
    return this.delete(this.items.findIndex(value));
  }

  /**
   * Get first item in the array
   */
  public first(callback?: Parameters<typeof Array.prototype.find>[0]) {
    if (this.items.length === 0) {
      return null;
    }

    if (callback) {
      return this.items.find(callback);
    }

    return this.items[0];
  }

  /**
   * Get the first item's value for the given key
   */
  public value(key: string, defaultValue = null) {
    for (let item of this.items) {
      let itemValue = get(item, key, NotExists);
      if (itemValue !== NotExists) {
        return itemValue;
      }
    }

    return defaultValue;
  }

  /**
   * Get value for the given key at the given index
   */
  public valueAt(index: number, key: string, defaultValue = null) {
    return get(this.items, `${index}.${key}`, defaultValue);
  }

  /**
   * Get the last's item value for the given key
   */
  public lastValue(key: string, defaultValue = null) {
    return this.reverse().value(key, defaultValue);
  }

  /**
   * Determine if the given value exists in the array
   */
  public includes(value: any): boolean {
    return this.items.includes(value);
  }

  /**
   * @alias includes
   */
  public contains(value: any): boolean {
    return this.items.includes(value);
  }

  /**
   * Get items in the given indexes
   */
  public only(...indexes: number[]) {
    return new ImmutableCollection(indexes.map(index => this.items[index]));
  }

  /**
   * Update the given item based on the given index
   * This will return a new collection
   */
  public set(index: number, value: any) {
    const items = [...this.items];
    items[index] = value;
    return new ImmutableCollection(items);
  }

  /**
   * @alias set
   */
  public update(index: number, value: any) {
    return this.set(index, value);
  }

  /**
   * Get item by index
   */
  public index(index: number) {
    return this.items[index];
  }

  /**
   * @alias index
   */
  public at(index: number) {
    return this.items[index];
  }

  /**
   * Return the items list
   */
  public toArray(map?: Parameters<typeof Array.prototype.map>[0]) {
    return map ? this.items.map(map) : this.items;
  }

  /**
   * @alias toArray
   */
  public all() {
    return this.items;
  }

  /**
   * Convert the collection to a string
   */
  public toString() {
    return this.items.toString();
  }

  /**
   * Join the items in the array
   */
  public join(separator?: string) {
    return this.items.join(separator);
  }

  /**
   * @alias join
   */
  public implode(separator?: string) {
    return this.items.join(separator);
  }

  /**
   * Convert the collection to a JSON string
   */
  public toJson(): string {
    return JSON.stringify(this.items);
  }

  /**
   * Map over the collection and return a new collection
   */
  public map(callback: Parameters<typeof Array.prototype.map>[0]) {
    return new ImmutableCollection(this.items.map(callback));
  }

  /**
   * Filter the collection based on the given callback
   */
  public filter(callback: Parameters<typeof Array.prototype.filter>[0]) {
    return new ImmutableCollection(this.items.filter(callback));
  }

  /**
   * @alias filter
   */
  public removeAll(value: Parameters<typeof Array.prototype.filter>[0]) {
    return this.filter(value);
  }

  /**
   * Sort the collection based on the given callback
   */
  public sort(callback?: Parameters<typeof Array.prototype.sort>[0]) {
    return new ImmutableCollection(this.items.sort(callback));
  }

  /**
   * Sort order by the given key in ascending order
   * If the given key is an object, it will sort by multiple keys
   * the key will be the object's property and the value will be the order
   */
  public sortBy(key: string): ImmutableCollection;
  public sortBy(multipleKeys: {
    [key: string]: "asc" | "desc";
  }): ImmutableCollection;
  public sortBy(sortType: any) {
    if (sortType === "string") {
      // sort items by the given key

      return new ImmutableCollection(
        this.items.sort((a: any, b: any) => {
          const aValue: any = get(a, sortType as string);
          const bValue: any = get(b, sortType as string);

          if (aValue < bValue) {
            return -1;
          }

          if (aValue > bValue) {
            return 1;
          }

          return 0;
        }),
      );
    }

    if (typeof sortType === "object") {
      // sort items by multiple keys

      return new ImmutableCollection(
        this.items.sort((a: any, b: any) => {
          const keys = Object.keys(sortType);

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const aValue: any = get(a, key);
            const bValue: any = get(b, key);

            if (aValue < bValue) {
              return sortType[key] === "asc" ? -1 : 1;
            }

            if (aValue > bValue) {
              return sortType[key] === "asc" ? 1 : -1;
            }
          }

          return 0;
        }),
      );
    }
  }

  /**
   * Sort order by the given key in descending order
   */
  public sortByDesc(key: string) {
    return new ImmutableCollection(
      this.items.sort((a: any, b: any) => {
        const aValue: any = get(a, key);
        const bValue: any = get(b, key);

        if (aValue < bValue) {
          return 1;
        }

        if (aValue > bValue) {
          return -1;
        }

        return 0;
      }),
    );
  }

  /**
   * Get all items that are not valid against the given callback
   */
  public reject(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    if (
      typeof callback === "string" ||
      typeof callback === "number" ||
      typeof callback === "boolean"
    ) {
      return this.filter((item: any) => item !== callback);
    }

    return new ImmutableCollection(
      this.items.filter((item, index, array) => {
        return !callback(item, index, array);
      }),
    );
  }

  /**
   * @alias reject
   */
  public not(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.reject(callback);
  }

  /**
   * @alias reject
   */
  public except(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.reject(callback);
  }

  /**
   * @alias reject
   */
  public exceptAll(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.reject(callback);
  }

  /**
   * @alias reject
   */
  public skipWhile(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.reject(callback);
  }

  /**
   * Get all items except the first matched callback
   */
  public rejectFirst(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    // return all items except first matched callback
    const newItems: any[] = [];

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (
        typeof callback === "string" ||
        typeof callback === "number" ||
        typeof callback === "boolean"
      ) {
        if (item !== callback) {
          newItems.push(item);
        } else {
          break;
        }
      } else {
        if (callback(item, i, this.items) === false) {
          newItems.push(item);
        } else {
          break;
        }
      }
    }

    return new ImmutableCollection(newItems);
  }

  /**
   * @alias rejectFirst
   */
  public exceptFirst(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.rejectFirst(callback);
  }

  /**
   * @alias rejectFirst
   */
  public skipFirst(
    callback:
      | string
      | number
      | boolean
      | Parameters<typeof Array.prototype.filter>[0],
  ) {
    return this.rejectFirst(callback);
  }

  /**
   * Chunk the collection into the given number of groups
   */
  public chunk(size: number) {
    return new ImmutableCollection(chunk(this.items, size));
  }

  /**
   * Clone the collection
   */
  public clone() {
    return new ImmutableCollection([...this.items]);
  }

  /**
   * @alias clone
   */
  public copy() {
    return this.clone();
  }

  /**
   * Reverse collection items
   */
  public reverse() {
    return new ImmutableCollection(this.items.reverse());
  }

  /**
   * @alias reverse
   */
  public flip() {
    return this.reverse();
  }

  /**
   * Determines whether all the members of an array satisfy the specified test.
   */
  public every(callback: Parameters<typeof Array.prototype.every>[0]) {
    return this.items.every(callback);
  }

  /**
   * Determines whether the specified callback function returns true for any element of an array.
   */
  public some(callback: Parameters<typeof Array.prototype.some>[0]) {
    return this.items.some(callback);
  }

  /**
   * Get the first matched item for the given callback
   */
  public find(callback: Parameters<typeof Array.prototype.find>[0]) {
    return this.items.find(callback);
  }

  /**
   * Skip the given number of items
   */
  public skip(number: number) {
    return new ImmutableCollection(this.items.slice(number));
  }

  /**
   * @alias skip
   */
  public skipTo(number: number) {
    return this.skip(number);
  }

  /**
   * Skip the last given number of items
   */
  public skipLast(number: number) {
    // get all items before the number
    const newItems = this.items.slice(0, -number);

    return new ImmutableCollection(newItems);
  }

  /**
   * Skip all items until the given callback returns true
   */
  public skipUntil(callback: Parameters<typeof Array.prototype.findIndex>[0]) {
    // get all items after the given callback
    const newItems = this.items.slice(this.findIndex(callback));

    return new ImmutableCollection(newItems);
  }

  /**
   * Get index of the given value
   */
  public indexOf(value: Parameters<typeof Array.prototype.indexOf>[0]) {
    return this.items.indexOf(value);
  }

  /**
   * Find the index of the first item matching the given callback.
   */
  public findIndex(callback: Parameters<typeof Array.prototype.findIndex>[0]) {
    return this.items.findIndex(callback);
  }

  /**
   * Get the last index of the given value.
   */
  public lastIndexOf(...args: Parameters<typeof Array.prototype.lastIndexOf>) {
    return this.items.lastIndexOf(...args);
  }

  /**
   * Get last index of the collection
   */
  public lastIndex() {
    return this.items.length - 1;
  }

  /**
   * Determine if the collection is empty.
   */
  public isEmpty(): boolean {
    return this.whereEmpty().length === 0;
  }

  /**
   * Determine if the collection is not empty.
   */
  public isNotEmpty(): boolean {
    return !this.isEmpty();
  }

  /**
   * Replace the first matched old value with the given new value.
   */
  public replace(oldValue: any, newValue: any) {
    const items = [...this.items];

    const valueIndex = items.findIndex(value => value === oldValue);

    if (valueIndex !== -1) {
      items[valueIndex] = newValue;
    }

    return new ImmutableCollection(items);
  }

  /**
   * Replace the old value with the given new value.
   */
  public replaceAll(oldValue: any, newValue: any) {
    return this.map((value: any) => {
      return value === oldValue ? newValue : value;
    });
  }

  /**
   * Shuffle the items in the collection.
   */
  public shuffle() {
    return new ImmutableCollection(shuffle(this.items) as any[]);
  }

  /**
   * Get random item from the collection.
   */
  public random(number: number);
  public random();
  public random(number?: number) {
    return number ? this.shuffle().take(number) : this.shuffle().first();
  }

  /**
   * Take items from the beginning of the collection to the given number.
   */
  public take(number: number) {
    return new ImmutableCollection(this.items.slice(0, number));
  }

  /**
   * Take last items from the collection to the given number.
   */
  public takeLast(number: number) {
    return new ImmutableCollection(this.items.slice(-number));
  }

  /**
   * Take items from the collection until the given callback returns true.
   */
  public takeUntil(callback: Parameters<typeof Array.prototype.findIndex>[0]) {
    return new ImmutableCollection(
      this.items.slice(0, this.findIndex(callback)),
    );
  }

  /**
   * Take a slice from the collection
   */
  public slice(...args: Parameters<typeof Array.prototype.slice>) {
    return new ImmutableCollection(this.items.slice(...args));
  }

  /**
   * Splice the underlying collection array.
   */
  public splice(...args: Parameters<typeof Array.prototype.splice>) {
    const items = [...this.items];
    items.splice(...args);

    return new ImmutableCollection(items);
  }

  /**
   * Execute a callback over each item.
   */
  public forEach(callback: Parameters<typeof Array.prototype.forEach>[0]) {
    this.items.forEach(callback);
    return this;
  }

  /**
   * @alias forEach
   */
  public each(callback: Parameters<typeof Array.prototype.forEach>[0]) {
    return this.forEach(callback);
  }

  /**
   * @alias forEach
   */
  public tap(callback: Parameters<typeof Array.prototype.forEach>[0]): this {
    return this.forEach(callback);
  }

  /**
   * Delete the given indexes from the collection
   */
  public unset(...indexes: number[]) {
    return this.filter((_, index) => !indexes.includes(index));
  }

  /**
   * Delete item by index
   */
  public delete(key: number) {
    return this.unset(key);
  }

  /**
   * Pluck an array of values from an array.
   * If the given key is string then we'll return an array of values of that key
   * If the given key is an array then we'll return an array of objects contains these keys
   */
  public pluck(key: string | string[]) {
    return new ImmutableCollection(pluck(this.items, key));
  }

  /**
   * Determine whether current collection contains the given item
   */
  public equals(value: any[] | ImmutableCollection): boolean {
    if (value instanceof ImmutableCollection) {
      value = value.all();
    }

    return areEqual(this.items, value);
  }

  /**
   * Get items based on the given operators
   */
  public where(key: string, value: any);
  public where(operator: ComparisonOperator, value: any);
  public where(key: string, operator: ComparisonOperator, value: any);
  public where(...args: any[]) {
    let [key, operator, value] = args;

    let isPrimitive = false;

    let isRegex = false;

    let isDate = false;

    if (args.length === 2) {
      if (Operators.includes(args[0])) {
        isPrimitive = true;
      }

      value = operator;

      operator = "=";
    }

    if (value instanceof RegExp) {
      isRegex = true;
    } else if (value instanceof Date) {
      isDate = true;
    }

    return this.filter((item: any) => {
      const itemValue: any = isPrimitive
        ? item
        : get(item as object, key, NotExists);

      if (isRegex) {
        return value.test(itemValue);
      }

      switch (operator) {
        case "=":
        case "equals":
          if (isDate) {
            return +itemValue === +value;
          }

          return itemValue === value;
        case "!=":
        case "notEquals":
        case "not":
          return itemValue !== value;
        case ">":
        case "gt":
          return itemValue > value;
        case ">=":
        case "gte":
          return itemValue >= value;
        case "<":
        case "lt":
          return itemValue < value;
        case "<=":
        case "lte":
          return itemValue <= value;
        case "like":
        case "%":
          return itemValue.match(
            value instanceof RegExp ? value : new RegExp(value, "i"),
          );
        case "not like":
        case "!%":
          return !itemValue.match(
            value instanceof RegExp ? value : new RegExp(value, "i"),
          );
        case "in":
          return value.includes(itemValue);
        case "not in":
        case "!in":
          return !value.includes(itemValue);
        case "between":
        case "<>":
          return itemValue >= value[0] && itemValue <= value[1];
        case "not between":
        case "!between":
        case "!<>":
          return itemValue < value[0] || itemValue > value[1];
        case "contains":
          return itemValue.includes(value);
        case "not contains":
        case "!contains":
          return !itemValue.includes(value);
        case "starts with":
          return itemValue.startsWith(value);
        case "not starts with":
        case "!starts with":
          return !itemValue.startsWith(value);
        case "ends with":
          return itemValue.endsWith(value);
        case "not ends with":
        case "!ends with":
          return !itemValue.endsWith(value);
        case null:
        case "is null":
        case "null":
          return itemValue === null;
        case !null:
        case "is not null":
        case "!null":
          return itemValue !== null;
        case "is undefined":
        case undefined:
        case "undefined":
          return itemValue === undefined;
        case !undefined:
        case "!undefined":
        case "is not undefined":
          return itemValue !== undefined;
        case "exists":
          return itemValue !== NotExists;
        case "not exists":
        case "!exists":
          return itemValue === NotExists;
        case true:
        case "true":
        case "is true":
          return itemValue === true;
        case !true:
        case "!true":
        case "is not true":
          return itemValue !== true;
        case false:
        case "false":
        case "is false":
          return itemValue === false;
        case !false:
        case "!false":
        case "is not false":
          return itemValue !== false;
        case "is":
        case "typeof":
          return typeof itemValue === value;
        case "is not":
        case "!is":
        case "!typeof":
        case "not typeof":
          return typeof itemValue !== value;
        case "instanceof":
        case "is a":
          return itemValue instanceof value;
        case "not instanceof":
        case "!instanceof":
        case "is not a":
        case "!is a":
          return !(itemValue instanceof value);
        default:
          return false;
      }
    });
  }

  /**
   * Get items where its value is in the given array
   */
  public whereIn(
    values: (string | number | boolean | Date)[],
  ): ImmutableCollection;
  public whereIn(
    key: string,
    values: (string | number | boolean | Date)[],
  ): ImmutableCollection;
  public whereIn(...args: any[]) {
    if (args.length === 1) {
      args = args[0];

      return this.filter((item: any) => {
        return args.includes(item);
      });
    }

    const [key, values] = args;

    return this.filter((item: any) => {
      return values.includes(get(item, key));
    });
  }

  /**
   * Get items where its value is not in the given array
   */
  public whereNot(key: string, value: any): ImmutableCollection;
  public whereNot(value: any): ImmutableCollection;
  public whereNot(...args: any[]) {
    if (args.length === 1) {
      args = args[0];

      return this.filter((item: any) => {
        return item !== args;
      });
    }

    const [key, value] = args;

    return this.filter((item: any) => {
      return get(item, key) !== value;
    });
  }

  /**
   * Get items where between the given values
   */
  public whereBetween(key: string, values: any[]): ImmutableCollection;
  public whereBetween(values: any[]): ImmutableCollection;
  public whereBetween(...args: any[]) {
    if (args.length === 1) {
      args = args[0];

      return this.filter((item: any) => {
        const [min, max] = args;

        return item >= min && item <= (max as any);
      });
    }

    const [key, values] = args;

    return this.filter((item: any) => {
      const [min, max] = values;

      const itemValue: any = get(item, key);

      return itemValue >= min && itemValue <= (max as any);
    });
  }

  /**
   * Get items where not between the given values
   */
  public whereNotBetween(key: string, values: any[]): ImmutableCollection;
  public whereNotBetween(values: any[]): ImmutableCollection;
  public whereNotBetween(...args: any[]) {
    if (args.length === 1) {
      args = args[0];

      return this.filter((item: any) => {
        const [min, max] = args;

        return item < min || item > (max as any);
      });
    }

    const [key, values] = args;

    return this.filter((item: any) => {
      const [min, max] = values;

      const itemValue: any = get(item, key);

      return itemValue < min || itemValue > (max as any);
    });
  }

  /**
   * Get empty items, weird but a valid case though
   */
  public whereEmpty(key?: string) {
    return this.filter((item: any) => {
      let value = key ? get(item, key) : item;

      return Is.empty(value);
    });
  }

  /**
   * Get all items that are not empty
   */
  public whereNotEmpty(key?: string) {
    return this.filter((item: any) => {
      let value = key ? get(item, key) : item;

      return !Is.empty(value);
    });
  }

  /**
   * @alias whereNotEmpty
   */
  public heavy(key?: string) {
    return this.whereNotEmpty(key);
  }

  /**
   * Get items where its value is null
   */
  public whereNull(key?: string) {
    return this.filter((item: any) => {
      let value = key ? get(item, key) : item;

      return value === null;
    });
  }

  /**
   * Get items where its value is not null
   */
  public whereNotNull(key?: string) {
    return this.filter((item: any) => {
      const value = key ? get(item, key) : item;

      return value !== null;
    });
  }

  /**
   * Get items that are not defined
   */
  public whereNotUndefined(key?: string) {
    return this.filter((item: any) => {
      const value = key ? get(item, key) : item;

      return value !== undefined;
    });
  }

  /**
   * Get items that are undefined
   */
  public whereUndefined(key?: string) {
    return this.filter((item: any) => {
      const value = key ? get(item, key) : item;

      return value === undefined;
    });
  }

  /**
   * Get first matching item
   */
  public firstWhere(callback: Parameters<typeof Array.prototype.find>[0]);
  public firstWhere(key: any, operator?: ComparisonOperator, value?: any);
  public firstWhere(...args: any[]) {
    return this.where(
      ...(args as Parameters<typeof ImmutableCollection.prototype.where>),
    ).first();
  }

  /**
   * Get last matching item
   */
  public lastWhere(callback: Parameters<typeof Array.prototype.find>[0]);
  public lastWhere(key: any, operator?: ComparisonOperator, value?: any);
  public lastWhere(...args: any[]) {
    return this.where(
      ...(args as Parameters<typeof ImmutableCollection.prototype.where>),
    ).last();
  }

  /**
   * Replace values for the given two indexes
   */
  public swap(index1: number, index2: number) {
    const items = [...this.items];

    [items[index1], items[index2]] = [items[index2], items[index1]];

    return new ImmutableCollection(items);
  }

  /**
   * Move the given index to the given position
   */
  public move(index: number, position: number) {
    const items = [...this.items];

    items.splice(position, 0, items.splice(index, 1)[0]);

    return new ImmutableCollection(items);
  }

  /**
   * Reorder the given indexes
   */
  public reorder(indexes: { [oldIndex: number]: number }) {
    const reorderedItems: any[] = [...this.items];

    Object.keys(indexes).forEach(oldIndex => {
      const newIndex = indexes[oldIndex];

      reorderedItems[newIndex] = this.items[oldIndex];
    });

    return new ImmutableCollection(reorderedItems);
  }

  /**
   * Group by the given key or keys
   */
  public groupBy(keys: string | string[]) {
    return new ImmutableCollection(groupBy(this.items, keys));
  }

  /**
   * Iterator
   */
  public [Symbol.iterator](): Iterator<any, any, undefined> {
    return this.items[Symbol.iterator]();
  }
}

export function collect(
  items: any[] | ImmutableCollection = [],
): ImmutableCollection {
  return new ImmutableCollection(items);
}
