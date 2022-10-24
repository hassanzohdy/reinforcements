# Array Collections

Collections are immutable arrays of values. They are similar to JavaScript arrays, besides that, it provides you with numerous helpers methods.

> This is a new feature in v2, it is part of the Reinforcements package.

## Usage

```ts
import { collect } from "@mongez/reinforcements";

const numbers = collect([1, 2, 3, 4, 5]);
```

## Immutable Collection

The `collect` function returns a new instance of `ImmutableCollection` which means any operation you perform like `map` or `filter` will return a new instance of `ImmutableCollection` and will not affect the original collection.

Also please note that any returned value as an array will be returned in a new `ImmutableCollection`, to transform it to array, you can use `toArray` method.

## Array Built In Methods

Array collections have all the built in methods of the array class. You can use them as you would use them in the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.map(number => number * 2); // [2, 4, 6, 8, 10]
```

## Unique

The `unique` method will remove any duplicate values from the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5, 5, 5]);

numbers.unique(); // [1, 2, 3, 4, 5]
```

We can also get the unique values of specific key.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.unique("name"); // ["John", "Jane"]
```

## Unique List

The `uniqueList` method will return all unique elements for the given value, so the key will be matched against the uniqueness criteria, and the first unique value will return the entire object instead of just the value itself.

```ts
const users = collect([
    { id: 1, name: 'John' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
]);

users.unique('name'); // [{ id: 1, name: 'John' }, { id: 3, name: 'Jane' }]
```

## Is Empty

The `isEmpty` method will return `true` if the collection is empty.

```ts
const numbers = collect([]);

numbers.isEmpty(); // true
```

## Is Not Empty

The `isNotEmpty` method will return `true` if the collection is not empty.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.isNotEmpty(); // true
```

## The Power of `where`

One of the most important methods that you might need to use most of the time is `where`. It will return a new collection with all the elements that match the given criteria.

### Identical match

To filter data that based on the given value, you can use the `where` method by passing the first argument as the searching key and second argument will receive the matching value.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.where("name", "John"); // [{ id: 1, name: "John" }, { id: 2, name: "John" }]
```

### Where Operators

You can also use operators to filter the data, the operators are:

```ts
Operators = [
  "=",
  "equals",
  "!=",
  "not",
  "not equals",
  ">",
  "gt",
  "<",
  "lt",
  ">=",
  "gte",
  "<=",
  "lte",
  "regex",
  "like",
  "%",
  "not like",
  "!%",
  "in",
  "!in",
  "not in",
  "between",
  "<>",
  "!between",
  "not between",
  "!<>",
  "is",
  "typeof",
  "is not",
  "!is",
  "not typeof",
  "is a",
  "instanceof",
  "is not a",
  "not instanceof",
  "!instanceof",
  "!is a",
  "exists",
  "not exists",
  "!exists",
  "contains",
  "not contains",
  "!contains",
  "starts with",
  "not starts with",
  "!starts with",
  "ends with",
  "not ends with",
  "!ends with",
  "null",
  "is null",
  "is not null",
  "!null",
  "!not null",
  "empty",
  "is empty",
  "is not empty",
  "!empty",
  "true",
  "is true",
  "is not true",
  "!true",
  "false",
  "is false",
  "!false",
  "undefined",
  "is undefined",
  "is not false",
  "is undefined",
  "is not undefined",
  "!undefined",
];
```

Let's group them by their usage.

- `=` and `equals` will match the value with the given value.
- `!=` and `not` and `not equals` will match the value **that is not equal** to the given value.
- `>` and `gt` will match the value **that is greater than** the given value.
- `<` and `lt` will match the value **that is less than** the given value.
- `>=` and `gte` will match the value **that is greater than or equal** to the given value.
- `<=` and `lte` will match the value **that is less than or equal** to the given value.
- `regex` will match the value **that matches the given regex**.
- `like` and `%` will match the value **that contains** the given value.
- `not like` and `!%` will match the value **that does not contain** the given value.
- `in` will match the value **that is in the given array**.
- `!in` and `not in` will match the value **that is not in the given array**.
- `between` and `<>` will match the value **that is between the given values**.
- `!between` and `not between` and `!<>` will match the value **that is not between the given values**.
- `is` and `typeof` will match the value **that is of the given type**.
- `is not` and `!is` and `not typeof` will match the value **that is not of the given type**.
- `is a` and `instanceof` will match the value **that is an instance of the given class**.
- `is not a` and `not instanceof` and `!instanceof` and `!is a` will match the value **that is not an instance of the given class**.
- `exists` will match the value **that exists**.
- `not exists` and `!exists` will match the value **that does not exist**.
- `contains` will match the value **that contains the given value**.
- `not contains` and `!contains` will match the value **that does not contain the given value**.
- `starts with` will match the value **that starts with the given value**.
- `not starts with` and `!starts with` will match the value **that does not start with the given value**.
- `ends with` will match the value **that ends with the given value**.
- `not ends with` and `!ends with` will match the value **that does not end with the given value**.
- `null` and `is null` will match the value **that is null**.
- `is not null` and `!null` and `!not null` will match the value **that is not null**.
- `empty` and `is empty` will match the value **that is empty**.
- `is not empty` and `!empty` will match the value **that is not empty**.
- `true` and `is true` will match the value **that is true**.
- `is not true` and `!true` will match the value **that is not true**.
- `false` and `is false` will match the value **that is false**.
- `is not false` and `!false` will match the value **that is not false**.
- `undefined` and `is undefined` will match the value **that is undefined**.
- `is not undefined` and `!undefined` will match the value **that is not undefined**.

Let's see example of each one of them

#### `=` and `equals`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.where("name", "=", "John"); // [{ id: 1, name: "John" }, { id: 2, name: "John" }]
```

#### `!=` and `not` and `not equals`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.where("name", "!=", "John"); // [{ id: 3, name: "Jane" }]
```

It is also possible to use the `not` operator

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.where("name", "not", "John"); // [{ id: 3, name: "Jane" }]
```

#### `>` and `gt`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", ">", 30); // [{ id: 3, age: 40 }]
```

It can also be used with dates

```ts
const users = collect([
    { id: 1, created_at: new Date("2020-01-01") },
    { id: 2, created_at: new Date("2020-02-01") },
    { id: 3, created_at: new Date("2020-03-01") },
]);

users.where("created_at", ">", new Date("2020-01-15")); // [{ id: 2, created_at: new Date("2020-02-01") }, { id: 3, created_at: new Date("2020-03-01") }]
```

#### `<` and `lt`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", "<", 30); // [{ id: 1, age: 20 }]
```

#### `>=` and `gte`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", ">=", 30); // [{ id: 2, age: 30 }, { id: 3, age: 40 }]
```

It can also compare dates

```ts
const users = collect([
    { id: 1, created_at: new Date("2020-01-01") },
    { id: 2, created_at: new Date("2020-02-01") },
    { id: 3, created_at: new Date("2020-03-01") },
]);

users.where("created_at", ">=", new Date("2020-02-01")); // [{ id: 2, created_at: new Date("2020-02-01") }, { id: 3, created_at: new Date("2020-03-01") }]
```

#### `<=` and `lte`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", "<=", 30); // [{ id: 1, age: 20 }, { id: 2, age: 30 }]
```

It can also compare to date

```ts
const users = collect([
    { id: 1, created_at: new Date("2020-01-01") },
    { id: 2, created_at: new Date("2020-02-01") },
    { id: 3, created_at: new Date("2020-03-01") },
]);

users.where("created_at", "<=", new Date("2020-02-01")); // [{ id: 1, created_at: new Date("2020-01-01") }, { id: 2, created_at: new Date("2020-02-01") }]
```

#### `regex`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jill" },
]);

users.where("name", "regex", /^J/); // [{ id: 1, name: "John" }, { id: 2, name: "Jane" }, { id: 3, name: "Jill" }]
```

You can also pass directly the regular expression as second argument without specifying the operator.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jill" },
]);

users.where("name", /^J/); // [{ id: 1, name: "John" }, { id: 2, name: "Jane" }, { id: 3, name: "Jill" }]
```

#### `like` and `%`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "like", "Jo"); // [{ id: 1, name: "John" }, { id: 2, name: "Jone" }]
```

### `not like` and `!like` and `!%`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "not like", "Jo"); // [{ id: 3, name: "Jill" }]
```

#### `is` and `typeof`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "is", "string"); // [{ id: 1, name: "John" }, { id: 2, name: "Jone" }, { id: 3, name: "Jill" }]
```

#### `not is` and `!is` and `!typeof`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "not is", "string"); // []
```

#### `starts with`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "starts with", "Jo"); // [{ id: 1, name: "John" }, { id: 2, name: "Jone" }]
```

#### `ends with`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "ends with", "ne"); // [{ id: 2, name: "Jone" }]
```

#### `in`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "in", ["John", "Jill"]); // [{ id: 1, name: "John" }, { id: 3, name: "Jill" }]
```

#### `not in` and `!in`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "not in", ["John", "Jill"]); // [{ id: 2, name: "Jone" }]
```

#### `between` and `<>`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", "between", [25, 35]); // [{ id: 2, age: 30 }]
```

It can also compare to dates as well.

```ts
const users = collect([
    { id: 1, created_at: new Date("2020-01-01") },
    { id: 2, created_at: new Date("2020-02-01") },
    { id: 3, created_at: new Date("2020-03-01") },
]);

users.where("created_at", "<>", [new Date("2020-01-15"), new Date("2020-02-15")]); // [{ id: 2, created_at: new Date("2020-02-01") }]
users.where("created_at", "between", [new Date("2020-01-15"), new Date("2020-02-15")]); // [{ id: 2, created_at: new Date("2020-02-01") }]
```

#### `not between` and `!<>` and `!between`

```ts
const users = collect([
    { id: 1, age: 20 },
    { id: 2, age: 30 },
    { id: 3, age: 40 },
]);

users.where("age", "!<>", [25, 35]); // [{ id: 1, age: 20 }, { id: 3, age: 40 }]
users.where("age", "not between", [25, 35]); // [{ id: 1, age: 20 }, { id: 3, age: 40 }]
```

It can also compare to dates as well.

```ts
const users = collect([
    { id: 1, created_at: new Date("2020-01-01") },
    { id: 2, created_at: new Date("2020-02-01") },
    { id: 3, created_at: new Date("2020-03-01") },
]);

users.where("created_at", "not between", [new Date("2020-01-15"), new Date("2020-02-15")]); // [{ id: 1, created_at: new Date("2020-01-01") }, { id: 3, created_at: new Date("2020-03-01") }]
```

#### `null`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: null },
    { id: 3, name: "Jill" },
]);

users.where("name", "null"); // [{ id: 2, name: null }]
```

#### `not null` and `!null`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: null },
    { id: 3, name: "Jill" },
]);

users.where("name", "not null"); // [{ id: 1, name: "John" }, { id: 3, name: "Jill" }]
```

#### `empty`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "" },
    { id: 3, name: "Jill" },
]);

users.where("name", "empty"); // [{ id: 2, name: "" }]
```

> Please note that the `empty` operator uses [Is.empty](https://github.com/hassanzohdy/supportive-is) under the hood to determine if the value is empty or not.

#### `not empty` and `!empty`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "" },
    { id: 3, name: "Jill" },
]);

users.where("name", "not empty"); // [{ id: 1, name: "John" }, { id: 3, name: "Jill" }]
```

> Please note that the `not empty` operator uses [Is.empty](https://github.com/hassanzohdy/supportive-is) under the hood to determine if the value is empty or not.

### undefined

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: undefined },
    { id: 3, name: "Jill" },
]);

users.where("name", "undefined"); // [{ id: 2, name: undefined }]
```

#### `not undefined` and `!undefined`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: undefined },
    { id: 3, name: "Jill" },
]);

users.where("name", "not undefined"); // [{ id: 1, name: "John" }, { id: 3, name: "Jill" }]
```

### `is a` and `instance of`

```ts

class Member {
    id = 1;
    name: 'John'
}

const users = collect([
    new Member(),
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "is a", Member); // [new Member()]
```

### `not is a` and `!is a` and `!instance of`

```ts

class Member {
    id = 1;
    name: 'John'
}

const users = collect([
    new Member(),
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.where("name", "not is a", Member); // [{ id: 2, name: "Jone" }, { id: 3, name: "Jill" }]
```

### `exists`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
    {id: 4, age: 31}
]);

users.where("name", "exists"); // [{ id: 1, name: "John" }, { id: 2, name: "Jone" }, { id: 3, name: "Jill" }]
```

### `not exists` and `!exists`

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
    {id: 4, age: 31}
]);

users.where("name", "not exists"); // [{id: 4, age: 31}]
```

### First where

The `firstWhere` receives the same exact arguments as `where` but it returns the first item that matches the condition.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "Jill" },
]);

users.firstWhere("name", "John"); // { id: 1, name: "John" }
```

### Last where

The `lastWhere` receives the same exact arguments as `where` but it returns the last item that matches the condition.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jone" },
    { id: 3, name: "John" },
    { id: 4, name: "Jill" },
]);

users.lastWhere("name", "John"); // { id: 3, name: "John" }
```

## Push

The `push` method will add the given value to the end of the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.push(6); // [1, 2, 3, 4, 5, 6]
```

> `append` method is an alias for `push`.

## Push Unique

The `pushUnique` method will add the given value to the end of the collection if it doesn't exist.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.pushUnique(6, 2, 3, 4, 5); // [1, 2, 3, 4, 5, 6]
```

## Prepend

The `prepend` method will add the given value to the beginning of the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.prepend(0); // [0, 1, 2, 3, 4, 5]
```

> `unshift` method is an alias for `prepend`.

## Prepend Unique

The `prependUnique` method will add the given value to the beginning of the collection if it doesn't exist.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.prependUnique(0, 2, 3, 4, 5, 6, 7); // [7, 6, 0, 1, 2, 3, 4, 5]
```

## Indexes

Get, Set, and Remove indexes from the collection.

### Get all indexes

Using `indexes` method will return a new collection of all indexes.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.indexes(); // [0, 1, 2, 3, 4]
```

## Getting Even Indexes

Using `evenIndexes` method will return a new collection of all even indexes.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.evenIndexes(); // [0, 2, 4]
```

## Getting Odd Indexes

Using `oddIndexes` method will return a new collection of all odd indexes.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.oddIndexes(); // [1, 3]
```

## Get Index

Using `index` method will return the index of the given value.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.index(3); // 2
```

> `at` method is an alias for `index`.

## Update By Index

Using `set` method will update the value of the given index.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.set(2, 6); // [1, 2, 6, 4, 5]
```

> `update` method is an alias for `set`.

## Remove By Index

Using `delete` method will remove the value of the given index.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.delete(2); // [1, 2, 4, 5]
```

We can also remove multiple indexes at once

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.delete(2, 3); // [1, 2, 5]
```

> `unset` method is an alias for `delete`.

## Working With Objects

### Pluck

The `pluck` method will return a new collection of the given key.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
]);

users.pluck("name"); // ["John", "Jane"]
```

It also accepts an array of strings to return multiple keys.

```ts
const users = collect([
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 25 },
]);

users.pluck(["name", "age"]); // [{ name: "John", age: 20 }, { name: "Jane", age: 25 }]
```

Kindly note that if `pluck` accepts a single key, it will return array of values for that key, but if it receives an array of keys, it will return an array of objects.

### Select

The `select` method will allow you return only the given keys from each of elements in the collection.

> It works exactly like pluck but it always returns an array of objects.

```ts
const users = collect([
    { id: 1, name: "John", age: 20 },
    { id: 2, name: "Jane", age: 25 },
]);

users.select("name", "age"); // [{ name: 'John', age: 20 }, { name: 'Jane', age: 25 }]
```

## Working With Single Values

The following methods will return a single value instead of a collection.

### First

The `first` method will return the first element in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.first(); // 1
```

> If the collection is empty, undefined will be returned.

### Last

The `last` method will return the last value from the collection without removing it.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.last();// 5
```

> If the collection is empty, undefined will be returned.

### Pop

The `pop` method will `remove` and `return` the last value from the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.pop();// 5 
console.log(numbers)// [1, 2, 3, 4]
```

> Please note that this method is mutable as it returns the last value

### Value

The `value` method will return value of the given key from array of objects

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.value("name"); // John
```

### Last Value

The `lastValue` method will return the last value of the given key from array of objects.

```ts
const users = collect([
    { id: 1, name: "John" },
    { id: 2, name: "John" },
    { id: 3, name: "Jane" },
]);

users.lastValue("name"); // Jane
```

## Working With Numbers

Collection provides you with a set of methods to work with numbers which will make it easier to manipulate.

### sum

The `sum` method returns the sum of all items in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.sum(); // 15
```

We can also sum value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.sum('age'); // 75
```

### average

The `average` method returns the average of all items in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.average(); // 3
```

We can also average value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.average('age'); // 25
```

> `avg` is an alias of `average`, you can use it as well.

### min

The `min` method returns the minimum value of all items in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.min(); // 1
```

We can also get the minimum value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.min('age'); // 20
```

### max

The `max` method returns the maximum value of all items in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.max(); // 5
```

We can also get the maximum value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.max('age'); // 30
```

### median

The `median` method returns the median value of all items in the collection.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.median(); // 3
```

We can also get the median value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.median('age'); // 25
```

### Plus

The `plus` method increase the given value to each element of the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.plus(2); // [3, 4, 5, 6, 7]
```

We can also increase the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.plus('age', 2); // [{ name: 'John', age: 22 }, { name: 'Jane', age: 27 }, { name: 'Jack', age: 32 }]
```

### increment

The `increment` method works exactly like `plus` except that increases each element by only `1`.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.increment(); // [2, 3, 4, 5, 6]
```

We can also increase the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.increment('age'); // [{ name: 'John', age: 21 }, { name: 'Jane', age: 26 }, { name: 'Jack', age: 31 }]
```

### Minus

The `minus` method decrease the given value to each element of the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.minus(2); // [-1, 0, 1, 2, 3]
```

We can also decrease the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.minus('age', 2); // [{ name: 'John', age: 18 }, { name: 'Jane', age: 23 }, { name: 'Jack', age: 28 }]
```

### Decrement

The `decrement` method works exactly like `minus` except that decreases each element by only `1`.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.decrement(); // [0, 1, 2, 3, 4]
```

We can also decrease the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.decrement('age'); // [{ name: 'John', age: 19 }, { name: 'Jane', age: 24 }, { name: 'Jack', age: 29 }]
```

## Multiply

The `multiply` method multiply the given value to each element of the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.multiply(2); // [2, 4, 6, 8, 10]
```

We can also multiply the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.multiply('age', 2); // [{ name: 'John', age: 40 }, { name: 'Jane', age: 50 }, { name: 'Jack', age: 60 }]
```

## Divide

The `divide` method divide the given value to each element of the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.divide(2); // [0.5, 1, 1.5, 2, 2.5]
```

We can also divide the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.divide('age', 2); // [{ name: 'John', age: 10 }, { name: 'Jane', age: 12.5 }, { name: 'Jack', age: 15 }]
```

If the given number is `0` it will throw an error so you might need to wrap it in try/catch block.

```ts
try {
    users.divide('age', 0);
} catch (error) {
    console.log(error.message); // Cannot divide by zero
}
```

## Modulus

The `modulus` method returns the remainder of the division of each element of the array by the given value.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.modulus(2); // [1, 0, 1, 0, 1]
```

We can also get the remainder of the division of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.modulus('age', 2); // [{ name: 'John', age: 0 }, { name: 'Jane', age: 1 }, { name: 'Jack', age: 0 }]
```

If the given number is `0` it will throw an error so you might need to wrap it in try/catch block.

```ts
try {
    users.modulus('age', 0);
} catch (error) {
    console.log(error.message); // Cannot have a modulus of zero
}
```

### Even Numbers

The `even` method returns all the even numbers in the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.even(); // [2, 4]
```

We can also get the even numbers of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.even('age'); // [{ name: 'John', age: 20 }, { name: 'Jack', age: 30 }]
```

### Odd Numbers

The `odd` method returns all the odd numbers in the array.

```ts
const numbers = collect([1, 2, 3, 4, 5]);

numbers.odd(); // [1, 3, 5]
```

We can also get the odd numbers of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.odd('age'); // [{ name: 'Jane', age: 25 }]
```

## Working With Strings

The Collection provides some utilities to work with strings.

### Concat String

The `concatString` method concatenates the given string to each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.concatString(' Doe'); // ['John Doe', 'Jane Doe', 'Jack Doe']
```

### Append String

The `appendString` method appends the given string to each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.appendString(' Doe'); // ['John Doe', 'Jane Doe', 'Jack Doe']
```

We can also append the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.appendString('name', ' Doe'); // [{ name: 'John Doe', age: 20 }, { name: 'Jane Doe', age: 25 }, { name: 'Jack Doe', age: 30 }]
```

> Note: The `appendString` method is an alias of `concatString`.

### Prepend String

The `prependString` method prepends the given string to each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.prependString('Mr. '); // ['Mr. John', 'Mr. Jane', 'Mr. Jack']
```

We can also prepend the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.prependString('name', 'Mr. '); // [{ name: 'Mr. John', age: 20 }, { name: 'Mr. Jane', age: 25 }, { name: 'Mr. Jack', age: 30 }]
```

### Replace String

The `replaceString` method replaces the given string with the given replacement string in each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.replaceString('John', 'Johnny'); // ['Johnny', 'Jane', 'Jack']
```

We can also replace the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.replaceString('John', 'Johnny', 'name'); // [{ name: 'Johnny', age: 20 }, { name: 'Jane', age: 25 }, { name: 'Jack', age: 30 }]
```

We can also pass regular expression for replacement as first argument.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.replaceString(/John/, 'Johnny'); // ['Johnny', 'Jane', 'Jack']
```

### Replace All String

The `replaceAllString` method replaces all the given string with the given replacement string in each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.replaceAllString('J', 'L'); // ['Lohn', 'Lane', 'Lack']
```

We can also replace all the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.replaceAllString('J', 'L', 'name'); // [{ name: 'Lohn', age: 20 }, { name: 'Lane', age: 25 }, { name: 'Lack', age: 30 }]
```

> Kindly note that `replaceAllString` method does not accept regular expression, use `replaceString` instead.

### Remove String

The `removeString` method removes the given string from each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.removeString('John'); // ['', 'Jane', 'Jack']
```

We can also remove the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.removeString('John', 'name'); // [{ name: '', age: 20 }, { name: 'Jane', age: 25 }, { name: 'Jack', age: 30 }]
```

We can also pass regular expression for removal as first argument.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.removeString(/John/); // ['', 'Jane', 'Jack']
```

### Remove All String

The `removeAllString` method removes all the given string from each element of the array.

```ts
const names = collect(['John', 'Jane', 'Jack']);

names.removeAllString('J'); // ['ohn', 'ane', 'ack']
```

We can also remove all the value of key if the array is an array of objects.

```ts
const users = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

users.removeAllString('J', 'name'); // [{ name: 'ohn', age: 20 }, { name: 'ane', age: 25 }, { name: 'ack', age: 30 }]
```

> Kindly note that `removeAllString` method does not accept regular expression, use `removeString` instead.
