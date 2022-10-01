import ImmutableCollection, { collect } from "./ImmutableCollection";

describe("reinforcements/ImmutableCollection/equality", () => {
  it("should return a Collection instance", () => {
    expect(collect([])).toBeInstanceOf(ImmutableCollection);
  });

  it("should equal to the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.equals([1, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should equal to the given collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.equals(collect([1, 2, 3, 4, 5]))).toBeTruthy();
  });
});
// describe("reinforcements/ImmutableCollection/math", () => {})
describe("reinforcements/ImmutableCollection/insert", () => {
  it("should add the given value to beginning of the collection using prepend", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.prepend(0).equals([0, 1, 2, 3, 4, 5])).toBeTruthy();
  });
  it("should add the given value to beginning of the collection using unshift", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.unshift(0).equals([0, 1, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should add the given value to end of the collection using append", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.append(6).equals([1, 2, 3, 4, 5, 6])).toBeTruthy();
  });

  it("should add the given value to end of the collection using push", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.push(6).equals([1, 2, 3, 4, 5, 6])).toBeTruthy();
  });

  it("should add the only the unique values to the beginning of the collection using pushUnique", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.prependUnique(6, 4, 5, 1).equals([1, 2, 3, 4, 5, 6]),
    ).toBeTruthy();
  });

  it("should add the only the unique values to the end of the collection using pushUnique", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.pushUnique(6, 4, 5, 1).equals([1, 2, 3, 4, 5, 6]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/update", () => {
  it("should update the value of the given index with a new value using update", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.update(0, 10).equals([10, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should update the value of the given index with a new value using set", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.set(4, 10).equals([1, 2, 3, 4, 10])).toBeTruthy();
  });

  it("should replace the given old value with the new value", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.replace(1, 10).equals([10, 2, 3, 4, 5])).toBeTruthy();
  });

  it("should replace all the old values with the given value", () => {
    const collection = collect([1, 2, 1, 3, 4, 1, 5]);

    expect(
      collection.replaceAll(1, 10).equals([10, 2, 10, 3, 4, 10, 5]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/deleteByIndex", () => {
  it("should delete the element of the given index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.delete(0).equals([2, 3, 4, 5])).toBeTruthy();
  });

  it("should delete the given indexes from the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.unset(0, 2, 4).equals([2, 4])).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/deleteByValue", () => {
  it("should delete first matched value with the callback from the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection.remove(value => value === 1).equals([2, 3, 4, 5]),
    ).toBeTruthy();
  });

  it("should return the first value from the collection and remove it as well", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.shift()).toEqual(1);

    expect(collection.equals([2, 3, 4, 5])).toBeTruthy();
  });

  it("should return the last value from the collection and remove it as well", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.pop()).toEqual(5);

    expect(collection.equals([1, 2, 3, 4])).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/merge", () => {
  it("should merge with the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection
        .merge([6, 7, 8, 9, 10])
        .equals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ).toBeTruthy();
  });

  it("should concat the given array to the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(
      collection
        .concat([6, 7, 8, 9, 10])
        .equals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    ).toBeTruthy();
  });
});

describe("reinforcements/ImmutableCollection/indexes", () => {
  it("should return the items length", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.length).toBe(5);
  });

  it("should return the indexes of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.indexes().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return the keys (indexes) as list of strings of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.keys().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return last index of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.lastIndex()).toBe(4);
  });

  it("should return the value at the given index using at", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.at(2)).toBe(3);
  });

  it("should return the value at the given index using index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.index(2)).toBe(3);
  });
});

describe("reinforcements/ImmutableCollection/string", () => {
  it("should append the given string to each collection item", () => {
    const collection = collect(["Ahmed", "Mohamed", "Ali"]);

    expect(collection.appendString(" Mohamed").all()).toEqual([
      "Ahmed Mohamed",
      "Mohamed Mohamed",
      "Ali Mohamed",
    ]);
  });

  it("should append the given string to the given key of each collection item", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.appendString(" Mohamed", "name").all()).toEqual([
      { name: "Ahmed Mohamed", age: 20 },
      { name: "Mohamed Mohamed", age: 25 },
      { name: "Ali Mohamed", age: 30 },
    ]);
  });

  it("should prepend the given string to each collection item", () => {
    const collection = collect(["Ahmed", "Mohamed", "Ali"]);

    expect(collection.prependString("Mohamed ").all()).toEqual([
      "Mohamed Ahmed",
      "Mohamed Mohamed",
      "Mohamed Ali",
    ]);
  });

  it("should prepend the given string to the given key of each collection item", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.prependString("Mohamed ", "name").all()).toEqual([
      { name: "Mohamed Ahmed", age: 20 },
      { name: "Mohamed Mohamed", age: 25 },
      { name: "Mohamed Ali", age: 30 },
    ]);
  });
});

describe("reinforcements/ImmutableCollection/getSingleValue", () => {
  it("should return the first value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.first()).toBe(1);
  });

  it("should return the last value of the collection using last", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.last()).toBe(5);
  });

  it("should return the last value of the collection using end", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.end()).toBe(5);
  });

  it("should return the value of the given index", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.index(0)).toBe(1);
  });

  it("should return the value of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.value("name")).toBe("Ahmed");
  });

  it("should return the value of the given key of the given index", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.valueAt(1, "name")).toBe("Mohamed");
  });
});

describe("reinforcements/ImmutableCollection/listings", () => {
  it("should return return values that are in the odd indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).oddIndexes();

    expect(collection.all()).toEqual([2, 4, 6]);
  });

  it("should return return values that are in the even indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).evenIndexes();

    expect(collection.all()).toEqual([1, 3, 5, 7]);
  });

  it("should return return values that are in the given indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).only(0, 2, 4);

    expect(collection.all()).toEqual([1, 3, 5]);
  });

  it("should return return values that are not in the given indexes", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).exceptIndexes(0, 2, 4);

    expect(collection.all()).toEqual([2, 4, 6, 7]);
  });

  it("should return even values", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).even();

    expect(collection.all()).toEqual([2, 4, 6]);
  });
  it("should return even values of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).even("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 20 },
      { name: "Ali", age: 30 },
    ]);
  });

  it("should return odd values", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).odd();

    expect(collection.all()).toEqual([1, 3, 5, 7]);
  });

  it("should return odd values of the given key", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).odd("age");

    expect(collection.all()).toEqual([{ name: "Mohamed", age: 25 }]);
  });
});

describe("reinforcements/ImmutableCollection/original", () => {
  // Original Array Methods tests
  it("should return map over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.map(item => item * 2).all()).toEqual([2, 4, 6, 8, 10]);
  });

  it("should return filter over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.filter(item => item % 2 === 0).all()).toEqual([2, 4]);
  });

  it("should return reduce over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.reduce((acc, item) => acc + item, 0)).toBe(15);
  });

  it("should return reduceRight over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.reduceRight((acc, item) => acc + item, 0)).toBe(15);
  });

  it("should return forEach over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);
    const spy = jest.fn();

    collection.forEach(spy);

    expect(spy).toHaveBeenCalledTimes(5);
  });

  it("should return every over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.every(item => item > 0)).toBeTruthy();
  });

  it("should return some over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.some(item => item > 0)).toBeTruthy();
  });

  it("should return find over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.find(item => item > 3)).toBe(4);
  });

  it("should return findIndex over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.findIndex(item => item > 3)).toBe(3);
  });

  it("should return includes over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.includes(3)).toBeTruthy();
  });

  it("should return indexOf over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.indexOf(3)).toBe(2);
  });

  it("should return lastIndexOf over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.lastIndexOf(3)).toBe(2);
  });

  it("should return join over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.join(",")).toBe("1,2,3,4,5");
  });

  it("should return keys over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.keys().all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should return values over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.values().all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return entries over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.entries().all()).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ]);
  });

  it("should return flat over the collection items", () => {
    const collection = collect([1, [2, 3], [4, 5]]);

    expect(collection.flat().all()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return flatMap over the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.flatMap(item => [item, item * 2]).all()).toEqual([
      1, 2, 2, 4, 3, 6, 4, 8, 5, 10,
    ]);
  });

  it("should concat the given array", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.concat([6, 7, 8]).all()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });
});

describe("reinforcements/ImmutableCollection/ordering", () => {
  it("should swap between two indexes", () => {
    const collection = collect([1, 2, 3, 4, 5]).swap(0, 4);

    expect(collection.all()).toEqual([5, 2, 3, 4, 1]);
  });

  it("should move the given index into the given position", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).move(2, 4);

    expect(collection.all()).toEqual([1, 2, 4, 5, 3, 6, 7]);
  });

  it("should reorder the indexes based on the given indexes object map", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]).reorder({
      0: 3,
      1: 4,
      2: 5,
      3: 6,
      4: 0,
      5: 1,
      6: 2,
    });

    expect(collection.all()).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });
});
describe("reinforcements/ImmutableCollection/math", () => {
  it("should return min value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.min()).toBe(1);
  });

  it("should return min value of the given key of the collection", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.min("age")).toBe(20);
  });

  it("should return max value of the collection", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.max()).toBe(5);
  });

  it("should return max value of the given key of the collection", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.max("age")).toBe(30);
  });

  it("should sum the total amount of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.sum()).toBe(15);
  });

  it("should sum the total amount of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.sum("age")).toBe(75);
  });

  it("should return the average of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.average()).toBe(3);
  });

  it("should return the average of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.average("age")).toBe(25);
  });

  it("should return the median of the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(collection.median()).toBe(3);
  });

  it("should return the median of the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(collection.median("age")).toBe(25);
  });

  it("should plus the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).plus(1);

    expect(collection.all()).toEqual([2, 3, 4, 5, 6]);
  });

  it("should plus the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).plus("age", 1);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 21 },
      { name: "Mohamed", age: 26 },
      { name: "Ali", age: 31 },
    ]);
  });

  it("should increment each item in the collection by one", () => {
    const collection = collect([1, 2, 3, 4, 5]).increment();

    expect(collection.all()).toEqual([2, 3, 4, 5, 6]);
  });

  it("should increment the given key of each item in the collection by the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).increment("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 21 },
      { name: "Mohamed", age: 26 },
      { name: "Ali", age: 31 },
    ]);
  });

  it("should minus the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).minus(1);

    expect(collection.all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should minus the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).minus("age", 1);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 19 },
      { name: "Mohamed", age: 24 },
      { name: "Ali", age: 29 },
    ]);
  });

  it("should decrement each item in the collection by one", () => {
    const collection = collect([1, 2, 3, 4, 5]).decrement();

    expect(collection.all()).toEqual([0, 1, 2, 3, 4]);
  });

  it("should decrement the given key of each item in the collection by the given value", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).decrement("age");

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 19 },
      { name: "Mohamed", age: 24 },
      { name: "Ali", age: 29 },
    ]);
  });

  it("should multiply the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).multiply(2);

    expect(collection.all()).toEqual([2, 4, 6, 8, 10]);
  });

  it("should multiply the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).multiply("age", 2);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 40 },
      { name: "Mohamed", age: 50 },
      { name: "Ali", age: 60 },
    ]);
  });

  it("should divide the given value to the collection items", () => {
    const collection = collect([1, 2, 3, 4, 5]).divide(2);

    expect(collection.all()).toEqual([0.5, 1, 1.5, 2, 2.5]);
  });

  it("should divide the given value to the given key of the collection items", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]).divide("age", 2);

    expect(collection.all()).toEqual([
      { name: "Ahmed", age: 10 },
      { name: "Mohamed", age: 12.5 },
      { name: "Ali", age: 15 },
    ]);
  });

  it("should not divide by zero and throw an error", () => {
    const collection = collect([1, 2, 3, 4, 5]);

    expect(() => collection.divide(0)).toThrowError("Cannot divide by zero");
  });

  it("should not divide by zero and throw an error", () => {
    const collection = collect([
      { name: "Ahmed", age: 20 },
      { name: "Mohamed", age: 25 },
      { name: "Ali", age: 30 },
    ]);

    expect(() => collection.divide("age", 0)).toThrowError(
      "Cannot divide by zero",
    );
  });
});

describe("reinforcements/ImmutableCollection/iterating", () => {
  it("should loop over the collection using for-of", () => {
    const collection = collect([1, 2, 3, 4, 5, 6, 7]);

    for (const value of collection) {
      expect(typeof value).toBe("number");
    }
  });
});
