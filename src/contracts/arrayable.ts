import Iterable from "./iterable";

export default interface Arrayable<T> extends Iterable<any> {
    /**
     * Array length
     *
     * @type {number}
     */
    length: number;
    /**
     * Get min value of the array
     *
     * @returns {number}
     */
    min(): number;
    /**
     * Get max value of the array
     *
     * @returns {number}
     */
    max(): number
    /**
     * Get the average value of the array 
     *
     * @returns {number}
     */
    avg(): number;
    /**
     * Get the average value of the array 
     *
     * @returns {number}
     */
    average(): number;
    /**
     * Merge the given arrays to the current one
     *
     * @param {...any[]} arrays
     * @returns {Arrayable} new instance
     */
    merge(...arrays: Array<any>[]): Arrayable<T>;
    /**
     * Merge the given arrays to the current one
     *
     * @param {...any[]} arrays
     * @returns {Arrayable} new instance
     */
    concat(...arrays: Array<any>[]): Arrayable<T>;
    /**
     * Get a unique array of values
     *
     * @returns {Arrayable} new instance
     */
    unique(): Arrayable<T>;
    /**
     * Shift the first item from the array 
     *
     * @returns {any}
     */
    shift(): any;
    
    /**
     * Get first value based on given filtration options
     * 
     * @param string key 
     * @param string operator 
     * @param any value 
     * @returns {*} 
     */
    firstWhere(key: any, operator: any, value: any): any;
    /**
     * Unshift the given items to the beginning of the array
     *
     * @returns {any}
     */
    unshift(...items: any[]): any;
    /**
     * Push one or more values to the array
     *
     * @param {...any[]} items
     * @returns {Arrayable}
     */
    push(...items: any[]): Arrayable<T>;
    /**
     * Push one or more values to the array if and 
     * only if the value doesn't exists in the array 
     *
     * @param {...any[]} items
     * @returns {Arrayable}
     */
    pushOnce(...items: any[]): Arrayable<T>;
    /**
     * Remove and get the last value of the array
     *
     * @returns {*}
     */
    pop(): any;
    /**
     * Get the last value of the array
     *
     * @returns {*}
     */
    end(): any;
    /**
     * Remove the first matched value with the given from the array
     * then reorder the array
     * 
     * @param {(Function|any)} value
     * @returns {Arrayable}
     */
    remove(value: Function | any): Arrayable<T>;
    /**
     * Remove all matched values with the given value from the array
     * then reorder the array
     * 
     * @param {(Function|any)} value
     * @returns {Arrayable}
     */
    removeAll(value: Function | any): Arrayable<T>;
    /**
     * Get the first value for the given callback function
     * If no passed callback, return the first value 
     *
     * @param {Function} [callback]
     * @returns {*}
     */
    first(callback?: Function): any;
    /**
     * Determine if the array includes the given value
     *
     * @param {*} value
     * @returns {boolean}
     */
    includes(value: any): boolean;
    /**
     * Get the value of the given index
     *
     * @param {number} index
     * @returns {Arrayable}
     */
    set(index: number, value: any): any;
    /**
     * Get the value of the given index
     *
     * @param {number} index
     * @returns {*}
     * @memberof Arr
     */
    get(index: number): any;
    /**
     * Return an array containing all items 
     *
     * @returns {Array<any>}
     */
    toArray(): Array<any>;
    /**
     * Map through the items using the given callback 
     *
     * @param {Function} callback
     * @returns {Arrayable} new instance
     */
    map(callback: Function): Arrayable<T>;
    /**
     * Walk through each element of the array and execute the given callback on it
     *
     * @param {Function} callback
     */
    forEach(callback: Function): void;
    /**
     * Filter the array using the given callback 
     *
     * @param {Function} callback
     * @returns {Arrayable} new instance
     */
    filter(callback: Function): Arrayable<T>;
    /**
     * Sort the array by the given callback, if no passed callback, use default sorting 
     *
     * @param {Function} [callback]
     * @returns {Arrayable}
     */
    sort(callback?: Function): Arrayable<T>;
    /**
     * Sort the array by the given key in ascendant order, this works only with arrays of objects
     *
     * @param {string} key
     * @returns {Arrayable}
     */
    sortBy(key: string): Arrayable<T>;
    /**
     * Sort the array by the given key in descendant order, this works only with arrays of objects
     *
     * @param {string} key
     * @returns {Arrayable}
     */
    sortByDesc(key: string): Arrayable<T>;
    /**
     * Execute a reducer function (that you provide) on each element of the array, resulting in a single output value.
     *
     * @param {Function} callback
     * @param {*} initialValue
     * @returns {*}
     */
    reduce(callback: Function, initialValue: any): any;
    /**
     * Chunk the array into groups of arrays based on the given size
     *
     * @param {number} size
     * @returns {Arrayable} new instance
     */
    chunk(size: number): Arrayable<T>;
    /**
     * Clone the array into another new Arrayable instance
     *
     * @returns {Arrayable} new instance
     */
    clone(): Arrayable<T>;
    /**
     * Reverse the order of the array
     *
     * @returns {Arrayable} new instance
     */
    reverse(): Arrayable<T>;
    /**
     * Get the first index of the given value
     *
     * @param {*} value
     * @returns {number}
     */
    indexOf(value: any): number;
    /**
     * Get the last index of the given value
     *
     * @param {*} value
     * @returns {number}
     */
    lastIndexOf(value: any): number;
    /**
     * Determine if the array is empty 
     *
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * Determine if the array is not empty
     *
     * @returns {boolean}
     */
    isNotEmpty(): boolean;
    /**
     * Get random value from the array
     *
     * @returns {*}
     */
    random(): any;
    /**
     * Replace the first matched value with the given value from the array to the new value
     *
     * @param {*} oldValue
     * @param {*} newValue
     * @returns {Arrayable}
     */
    replace(oldValue: any, newValue: any): Arrayable<T>;
    /**
     * Replace all matched values with the given value from the array to the new value
     *
     * @param {*} oldValue
     * @param {*} newValue
     * @returns {Arrayable}
     */
    replaceAll(oldValue: any, newValue: any): Arrayable<T>;
    /**
     * Shuffle array items
     *
     * @returns {Arrayable}
     */
    shuffle(): Arrayable<T>;
    /**
     * Slice the array based on the given beginning and end value
     *
     * @param {number} [begin]
     * @param {number} [end]
     * @returns {Arrayable} new instance
     */
    slice(begin?: number, end?: number): Arrayable<T>;
    /**
     * Slice the array based on the given beginning and end value
     *
     * @param {number} start
     * @param {number} [deleteCount]
     * @param {...any[]} items
     * @returns {Arrayable}
     */
    splice(start: number, deleteCount?: number, ...items: any[]): Arrayable<T>;
    /**
     * Tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
     *
     * @param {Function} callback
     * @returns {boolean}
     */
    some(callback: Function): boolean;
    /**
     * Tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value
     *
     * @param {Function} callback
     * @returns {boolean}
     */
    every(callback: Function): boolean;
    /**
     * Remove all values from the array for the given keys
     * then reorder the array
     *
     * @param {...number[]} keys
     * @returns {any}
     */
    unset(...keys: number[]): any;

    /**
     * Pluck a column of value form array of objects
     * The key should implement dot notation syntax.
     * 
     * @param {string} key
     * @returns {Arrayable} 
     */
    pluck(key: string): Arrayable<T>;
    /**
     * Filter the items using the given criteria
     * The key should implement dot notation syntax.
     * This method accepts two or three arguments
     * If two arguments passed, then the operator parameter will be the value parameter and the operator will be equal 
     * 
     * Available operators: `=`, `>`, `>=`, `<>`, `!=`, `<`, `<=`
     * 
     * @param {string} key
     * @param {any} operator
     * @param {any} value
     * @returns {Arrayable} 
     */
    where(key: string, operator: any, value: any): Arrayable<T>;
}