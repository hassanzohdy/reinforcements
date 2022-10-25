# Reinforcements

`Reinforcements` is a node js package written in `Typescript` to give a massive support for variant data like `Strings`, `Arrays`, `Objects` ... and so on.

For version 1 documentation, please visit [here](./docs/VERSION-1.md)

## Installation

`yarn add @mongez/reinforcements`

or using `npm`

`npm i @mongez/reinforcements`

## Usage

## Collections

Reinforcements is shipped with a powerful collection class that can be used to manipulate arrays of objects, here are some example of usage.

```ts
import { collect } from '@mongez/reinforcements';

const collection = collect([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
    { name: 'Jack', age: 30 },
]);

// get the first item
const firstItem = collection.first();

// get the last item
const lastItem = collection.last();

// get the item at index 1
const itemAtIndex1 = collection.at(1);

// get users with age greater than 25
const users = collection.where('age', '>', 25);

// get users with age greater than 25 and less than 30
const users = collection.where('age', '>', 25).where('age', '<', 30);
```

You can see the entire documentation in [Collection](./docs/collection.md) Page.

## Working with objects

Reinforcements is shipped with `Obj` object which provides good utilities for working with objects.

```ts
import { Obj } from "@mongez/reinforcements";

let user = {
  id: 1,
  name: {
    first: "Hasan",
    last: "Zohdy",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

Obj.get(user, "id"); // 1
Obj.get(user, "name"); // {first: 'Hasan', last: 'Zohdy'}
Obj.get(user, "name.first"); // Hasan
Obj.get(user, "address.country"); // Egypt
Obj.get(user, "address.building.number"); // 12
Obj.get(user, "address.building.floor.number"); // 3
```

As we can see in the previous example, we can get values from objects using **dot.notation.syntax**.

If the key is missing in the object, we may return default value instead.

```ts
Obj.get(user, "email", "no-email"); // no-email
```

You can also import `get` function directly from the package.

```ts
import { get } from "@mongez/reinforcements";

get(user, "id"); // 1
```

### Setting value in object

This works exactly but `Obj.set(object, key, value)` will set the value to the given object, which means it won't return **a new object** but the same object.

```ts
import { Obj } from "@mongez/reinforcements";

let user = {
  id: 1,
  name: {
    first: "Hasan",
    last: "Zohdy",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

Obj.set(user, "email", "hassanzohdy@gmail.com");
Obj.set(user, "address.building.floor.apartment", 36);
Obj.set(user, "job.title", "Software Engineer");
```

In the previous example, we've three different cases, first case which would not be used with `Obj.set` which is setting one level key to the given object `user`, in this case we added `email` key.

In the second scenario, we added a new nested key in `address.building.floor` object, which is `apartment`, this would be a nice case to use `Obj.set`.

The last scenario, we don't have `job` key, the function will create `job` key then set `job.title` inside it.

The final user object will be:

```json
{
  "id": 1,
  "email": "hassanzohdy@gmail.com",
  "job": {
    "title": "Software Engineer"
  },
  "name": {
    "first": "Hasan",
    "last": "Zohdy"
  },
  "address": {
    "country": "Egypt",
    "building": {
      "number": 12,
      "floor": {
        "number": 3,
        "apartment": 36
      }
    }
  }
}
```

You can also import `set` function directly from the package.

```ts
import { set } from "@mongez/reinforcements";

set(user, "email", "hassanzohdy@gmail.com");
```

### Merging objects deeply

Another good feature from `Obj` object is to merge objects deeply.

You may use `Obj.merge` or import `merge` directly from the package.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
};

const userJob = {
  job: {
    title: "Software Engineer",
    level: "Senior",
  },
};

const userWithJob = Obj.merge(user, userJob);
```

Final output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "title": "Software Engineer",
    "level": "Senior"
  }
}
```

But why not simply using the following syntax?

```ts
const user = {
  id: 1,
  name: "Hasan Zohdy",
};

const userJob = {
  job: {
    title: "Software Engineer",
    level: "Senior",
  },
};

const userWithJob = { ...user, ...userJob };
// OR
const userWithJob = Object.assign({}, user, userJob);
```

In the previous example, that would be the proper approach as the merging depth here is simple, but let's take another example.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  job: {
    title: "Software Engineer",
  },
};

const userJob = {
  job: {
    level: "Senior",
  },
};

const userWithJob = Obj.merge(user, userJob);
```

The output will be:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "title": "Software Engineer",
    "level": "Senior"
  }
}
```

But when using spread syntax or `Object.assign` will give us a different value.

```ts
const user = {
  id: 1,
  name: "Hasan Zohdy",
  job: {
    title: "Software Engineer",
  },
};

const userJob = {
  job: {
    level: "Senior",
  },
};

const userWithJob = { ...user, ...userJob };
// OR
const userWithJob = Object.assign({}, user, userJob);
```

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "job": {
    "level": "Senior"
  }
}
```

You can also import `merge` function directly from the package.

```ts
import { merge } from "@mongez/reinforcements";

const userWithJob = merge(user, userJob);
```

### Clone objects

You can also make a **deep copy** for the given object using `Obj.clone` or `clone`

```ts
const user = {
  id: 1,
  name: {
    first: "Hasan",
  },
};

const normalClonedUser = { ...user };

normalClonedUser.name.first = "Ali";

// both will be the same as only the top level is deeply copied but nested objects are shallow copies
console.log(normalClonedUser.name.first); // Ali
console.log(user.name.first); // Ali
```

Now using `Obj.clone`

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: {
    first: "Hasan",
  },
};

const normalClonedUser = Obj.clone(user);

cloned.name.first = "Ali";

console.log(cloned.name.first); // Ali
// Here the original object is kept untouched
console.log(user.name.first); // Hasan
```

### Getting certain values from object

To get a new object from the base object with only list of keys, use `Obj.only(object: object, keys: string[]): object`

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

const simpleUserData = Obj.only(user, ["id", "name", "email"]); // {id: 1, name: 'Hasan Zohdy', email: 'hassanzohdy@gmail.com'}
```

You can also import `only` function directly from the package.

```ts
import { only } from "@mongez/reinforcements";

const simpleUserData = only(user, ["id", "name", "email"]);
```

### Getting all object except for certain keys

This is the reverse of `obj.only`, which returns the entire object except for the given keys.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

const simpleUserData = Obj.except(user, ["id", "address", "email"]); // { name: 'Hasan Zohdy', email: 'hassanzohdy@gmail.com', job: {title: 'Software Engineer'}}
```

You can also import `except` function directly from the package.

```ts
import { except } from "@mongez/reinforcements";

const simpleUserData = except(user, ["id", "address", "email"]);
```

### Flatten objects

We can flatten any big fat objects into one object, with only one dimension.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.flatten(user));
```

Output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "email": "hassanzohdy@gmail.com",
  "job.title": "Software Engineer",
  "address.country": "Egypt",
  "address.building.number": 12,
  "address.building.floor.number": 3
}
```

You may set the separator by passing second argument to the function.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.flatten(user, "->"));
```

Output:

```json
{
  "id": 1,
  "name": "Hasan Zohdy",
  "email": "hassanzohdy@gmail.com",
  "job->title": "Software Engineer",
  "address->country": "Egypt",
  "address->building->number": 12,
  "address->building->floor->number": 3
}
```

You can also import `flatten` function directly from the package.

```ts
import { flatten } from "@mongez/reinforcements";

console.log(flatten(user));
```

### Sort object by its keys

To sort objects based on their keys alphabets recursively use `Obj.sort(object: object, recursive: boolean = true): object` function.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.sort(user));
```

Output:

```json
{
  "address": {
    "building": {
      "floor": {
        "number": 3
      },
      "number": 12
    },
    "country": "Egypt"
  },
  "email": "hassanzohdy@gmail.com",
  "id": 1,
  "job": {
    "title": "Software Engineer"
  },
  "name": "Hasan Zohdy"
}
```

To sort the object only the first level, pass the second argument as false.

```ts
import { Obj } from "@mongez/reinforcements";

const user = {
  id: 1,
  name: "Hasan Zohdy",
  email: "hassanzohdy@gmail.com",
  job: {
    title: "Software Engineer",
  },
  address: {
    country: "Egypt",
    building: {
      number: 12,
      floor: {
        number: 3,
      },
    },
  },
};

console.log(Obj.sort(user, false));
```

Output:

```json
{
  "address": {
    "country": "Egypt",
    "building": {
      "number": 12,
      "floor": {
        "number": 3
      }
    }
  },
  "email": "hassanzohdy@gmail.com",
  "id": 1,
  "job": {
    "title": "Software Engineer"
  },
  "name": "Hasan Zohdy"
}
```

You can also import `sort` function directly from the package.

```ts
import { sort } from "@mongez/reinforcements";

console.log(sort(user));
```

## Equal Values

Using `areEqual` function will check if the given two values equal to each other, it will validate against any type such as objects, arrays, strings, numbers, booleans, null, undefined, symbols.

```ts
import { areEqual } from "@mongez/reinforcements";

console.log(areEqual(1, 1)); // true

console.log(areEqual("1", 1)); // false

console.log(areEqual("1", "1")); // true

console.log(areEqual(true, true)); // true

console.log(areEqual(true, false)); // false

console.log(areEqual(null, null)); // true

console.log(areEqual(undefined, undefined)); // true

console.log(areEqual(Symbol("1"), Symbol("1"))); // false

console.log(areEqual(Symbol("1"), Symbol("2"))); // false

console.log(areEqual([1, 2, 3], [1, 2, 3])); // true

console.log(areEqual([1, 2, 3], [1, 2, 3, 4])); // false

console.log(areEqual({ id: 1 }, { id: 1 })); // true

console.log(areEqual({ id: 1 }, { id: 2 })); // false
```

## Generating Random Values

Another good feature is `Random` object, which allows us to generate variant random values of different types.

### Generate random string

To generate a random string use `Random.string(length: number = 32): string` method.

```ts
import { Random } from "@mongez/reinforcements";

Random.string(); // 4G8JyA4uM5YVMbkqVaoYnW6GzPcC64Fy
```

To generate a random string with certain length, just pass the length value to the function.

```ts
import { Random } from "@mongez/reinforcements";

Random.string(12); // P057C06VPwxl
```

### Generate random integer

To generate a random integer use `Random.int(min: number = 1, max: number = 9999999): number` method.

```ts
import { Random } from "@mongez/reinforcements";

Random.int(); // 7387115
Random.int(); // 9411554
Random.int(); // 691593
```

To set min value, pass first argument with minimum value

```ts
import { Random } from "@mongez/reinforcements";

Random.int(10); // 7387115
```

To set min and max value, pass second argument as well with maximum value

```ts
import { Random } from "@mongez/reinforcements";

Random.int(10, 100); // 36
```

> `Random.integer` is an alias to `Random.int`.

### Generate random html id

This function will generate a valid random html id string `Random.id(length: number = 6, startsWith: string = "el-"): string`.

```ts
import { Random } from "@mongez/reinforcements";

Random.id(); // el-SDFefdvgtr2e3qw
Random.id(); // el-fasrg3q
```

You may set the length as first argument and/or set the id prefix as second argument (**default is el-**).

### Generate random boolean value

To generate random boolean value use `Random.bool(): boolean` or `Random.boolean(): boolean`

```ts
import { Random } from "@mongez/reinforcements";

Random.bool(); // true
Random.bool(); // true
Random.bool(); // false
Random.boolean(); // false
Random.boolean(); // true
Random.boolean(); // false
```

### Generate random color

To generate random color use `Random.color(): string` method.

```ts
import { Random } from "@mongez/reinforcements";

Random.color(); // #f2f2f2
```

### Generate random date

To generate random date use `Random.date(min: Date = new Date(1970, 1, 1), max: Date = new Date()): Date` method.

```ts
import { Random } from "@mongez/reinforcements";

Random.date(); // 2020-12-12T12:12:12.000Z

// Get random date between two dates
Random.date(new Date(2010, 1, 1), new Date(2020, 1, 1)); // 2015-12-12T12:12:12.000Z

// Get random date that is higher than the given date
Random.date(new Date(2010, 1, 1)); // 2015-12-12T12:12:12.000Z

// Get random date that is lower than the given date
Random.date(null, new Date(2010, 1, 1)); // 2005-12-12T12:12:12.000Z
```

## Round float numbers

To round float numbers, use `round(value: number, precision: number = 2): number`.

```ts
import { round } from "@mongez/reinforcements";

console.log(round(10.0001)); // 10
console.log(round(10.0478878)); // 10.04
console.log(round(10.6987894849)); // 10.69
console.log(round(10.6987894849, 3)); // 10.698
```

## Working With Strings

The following list defines all available string utilities

- `capitalize`
- `toCamelCase`
- `toSnakeCase`
- `toKebabCase`
- `toStudlyCase`
- `ucfirst`
- `toInputName`
- `extension`
- `readMoreChars`
- `readMoreWords`
- `replaceFirst`
- `replaceLast`
- `replaceAll`
- `removeFirst`
- `removeLast`
- `repeatsOf`
- `ltrim`
- `trim`
- `rtrim`
- `startsWithArabic`

### Capitalize words

Capitalize each word in string Separated by whitespace `capitalize(string: string): string`.

```ts
import { capitalize } from "@mongez/reinforcements";

const words = "hello world";

console.log(capitalize(words)); // Hello World
```

### Convert string to camel case

Convert string to camel case, each word in string Separated by **whitespace** **underscores** or **dashes** `toCamelCase(string: string, separator: string = "\\s+|-|/|_|\\."): string`.

```ts
import { toCamelCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toCamelCase(words)); // helloWorld
```

Any of following will be used as a separator for the text, `.` | `-` | `whitespace` | `/`, you can set the separator as second argument though.

### Convert string to snake case

Convert string to snake case, each word in string Separated by **whitespace** or **dashes** `toSnakeCase(string: string, separator: string = '_', lowerAll: boolean = true): string`.

The final output of the text will be all letters in lower case string separated by \_ **underscores**.

```ts
import { toSnakeCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toSnakeCase(words)); // hello_world
```

You can also set custom separator as second argument.

```ts
import { toSnakeCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toSnakeCase(words, '-')); // hello-world
```

Also setting the third argument to false will not convert letters to lower case, will keep each letter as its own.

```ts
import { toSnakeCase } from "@mongez/reinforcements";

const words = "Hello World";

console.log(toSnakeCase(words, '-', false)); // Hello_World
```

### Convert string to kebab case

Convert string to kebab case, each word in string Separated by **whitespace** or **dashes** or **Upper Letters** `toKebabCase(string: string, lowerAll: boolean = true): string`.

The final output of the text will be all letters in lower case string separated by \- **dashes**.

```ts
import { toKebabCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toKebabCase(words)); // hello-world
```

If you want to ignore the lower case conversion, set the second argument to false.

```ts
import { toKebabCase } from "@mongez/reinforcements";

const words = "Hello World";

console.log(toKebabCase(words, false)); // Hello-World
```

### Convert string to studly case

Convert string to studly case, each word in string Separated by **whitespace**, **underscores** or **dashes** `toStudlyCase(string: string, separator: string = "-|\\.|_|\\s"): string`.

The final output will be capitalizing each word and glue it together without any separators such as **whitespace**, **under scores** or **dashes**.

```ts
import { toStudlyCase } from "@mongez/reinforcements";

const words = "hello world";

console.log(toStudlyCase(words)); // HelloWorld
```

### Capitalize first word of string

Capitalize only first word of string `ucfirst(string: string): string`.

```ts
import { ucfirst } from "@mongez/reinforcements";

const words = "hello world";

console.log(ucfirst(words)); // Hello world
```

### To input name

Convert dot notation syntax to valid html input name `toInputName(string: string): string`.

```ts
import { toInputName } from "@mongez/reinforcements";

const name = "user.name";

console.log(toInputName(name)); // user[name]
console.log(toInputName("keywords.en.list[]")); // keywords[en][list][]
```

### Get extension of string

Get the last extension in the string, the string that is suffix to last dot `.`.

`extension(string: string): string`

```ts
import { extension } from "@mongez/reinforcements";

const file = "my-image.png";

console.log(extension(file)); //png
```

### Read more characters

This function will cut off the string when characters reach limit, and append three dots `...` at the end of the string.

`readMoreChars(string: string, length: number, readMoreDots: string = '...'): string`

```ts
import { readMoreChars } from "@mongez/reinforcements";

const string = "This is a fine words list";

console.log(readMoreChars(string, 20)); // This is a fine words...

// if the given limit is equal to or more than string length, then the entire string will be returned without any dots
console.log(readMoreChars(string, 30)); // This is a fine words list

// change the three dots to something else

const string = "This is a fine words list";

console.log(readMoreChars(string, 20, " >>")); // This is a fine words >>
```

### Read more words

This function will cut off the string when words reach the given limit, and append three dots `...` at the end of the string.

This works based on total number of whitespace in the string.

`readMoreWords(string: string, length: number, readMoreDots: string = '...'): string`

```ts
import { readMoreWords } from "@mongez/reinforcements";

const string = "This is a fine words list";

console.log(readMoreWords(string, 4)); // This is a fine...

// if the given limit is equal to or more than words length, then the entire string will be returned without any dots
console.log(readMoreWords(string, 6)); // This is a fine words list

// change the three dots to something else

const string = "This is a fine words list";

console.log(readMoreWords(string, 4, " >>")); // This is a fine >>
```

### Remove first matched string

Remove the first matched needle to the given string.

`removeFirst(string: string, needle: string): string`

```ts
import { removeFirst } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(removeFirst(words, "home")); // welcome  buddy, your are not safe at your home!
```

### Replace first matched string

Replace the first matched needle to the given string.

`replaceFirst(string:string, needle: string, replacement: string): string`

```ts
import { replaceFirst } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceFirst(words, "home", "country")); // welcome country buddy, your are not safe at your home!
```

### Replace last matched string

Replace the last matched needle to the given string.

`replaceLast(string:string, needle: string, replacement: string): string`

```ts
import { replaceLast } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceLast(words, "home", "country")); // welcome home buddy, your are not safe at your country!
```

### Replace all matched string

Replace all matched words to the given string.

`replaceAll(string: string, searchText:string, replacement: string): string`

```ts
import { replaceAll } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(replaceAll(words, "home", "country")); // welcome country buddy, your are not safe at your country!
```

### Remove last matched string

Remove the last matched needle to the given string.

`removeLast(string: string, needle: string): string`

```ts
import { removeLast } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(removeLast(words, "home")); // welcome home buddy, your are not safe at your !
```

### Count repeats of needle in a string

Count repeats of a needle in the given string.

`repeatsOf(string: string, needle: string, caseSensitive: boolean = true): number`

```ts
import { repeatsOf } from "@mongez/reinforcements";

const words = "welcome home buddy, your are not safe at your home!";

console.log(repeatsOf(words, "home")); // 2
```

You may also detect number of repetitions ignoring case sensitive.

```ts
import { repeatsOf } from "@mongez/reinforcements";

// note the first Home is capitalized
const words = "welcome Home buddy, your are not safe at your home!";

// case sensitive
console.log(repeatsOf(words, "home")); // 1
// case insensitive
console.log(repeatsOf(words, "home", false)); // 2
```

### Trimming values from string

Trim value from the start and the end of a string.

`trim(string: string, needle: string = ' '): string`

```ts
import { trim } from "@mongez/reinforcements";

const string = " space at the start and at the end ";

console.log(trim(string)); // "space at the start and at the end"
```

But why not use [String.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) directly? well they both will give you same functionality except that `trim()` function trims any value not only white space.

Remove certain value:

```ts
import { trim } from "@mongez/reinforcements";

const string = "/home/";

console.log(trim(string, "/")); // home
```

### Left Trimming values from string

Trim value from the start of a string.

`ltrim(string: string, needle: string = ' '): string`

```ts
import { ltrim } from "@mongez/reinforcements";

const string = " A space at the start and keep space at the end ";

console.log(ltrim(string)); // "A space at the start and keep space at the end "
```

Remove certain value:

```ts
import { ltrim } from "@mongez/reinforcements";

const string = "home/";

console.log(ltrim(string, "/")); // home/
```

### Right Trimming values from string

Trim value from the end of a string.

`rtrim(string: string, needle: string = ' '): string`

```ts
import { rtrim } from "@mongez/reinforcements";

const string = " Keep A space at the start and remove space at the end ";

console.log(rtrim(string)); // " Keep A space at the start and remove space at the end"
```

Remove certain value:

```ts
import { ltrim } from "@mongez/reinforcements";

const string = "home/";

console.log(rtrim(string, "/")); // /home
```

## Detect if string starts with Arabic

Determine if the string starts with Arabic letter.

`startsWithArabic(text: string, trimmed: boolean = true): boolean {`

```ts
import { startsWithArabic } from "@mongez/reinforcements";

const string = "English Text";

const arabicString = "مرحبا";

console.log(startsWithArabic(string)); // false
console.log(startsWithArabic(arabicString)); // true
```

## Debounce

`debounce(callback: Function, timer: number = 0): void`

You can debounce your functions using `debounce` to prevent multiple calls.

> This debounce function will be called instantly and will not return a callback function.

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  sendEmailApi(e.target);
}

// If user clicked 5 times, it will make 5 ajax calls

<button click={sendEmail}>Send Email</button>;
```

Now when using `debounce`

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  debounce(() => {
    sendEmailApi(e.target);
  });
}

// If user clicked 5 times, it will make only one ajax call

<button click={sendEmail}>Send Email</button>;
```

You can also set a timer when to trigger the function

```tsx
import { debounce } from "@mongez/reinforcements";

function sendEmail(e: any) {
  // wait 3 seconds before calling the function
  debounce(() => {
    sendEmailApi(e.target);
  }, 150);
}

// If user clicked 5 times, it will make only one ajax call

<button click={sendEmail}>Send Email</button>;
```

## Tests

To run tests run `npm run test` or `yarn test`

## TODO

If you want to contribute to this package, you can check the [todo list page](./docs/todo.md).

## Change Log

- 2.0.5 (25 Oct 2022)
  - Added `toKebabCase` function
- 2.0.0 (24 Oct 2022)
  - Fully refactored the code.
  - Added Immutable Collections class.
- 1.0.28 (11 Aug 2022)
  - Fixed object merge call.
- 1.0.27 (11 Aug 2022)
  - Added test.
  - `toCamelCase` now will use the dot `.` as separator.
  - `toCamelCase`'s separator is not explicit as second argument.
- 1.0.26 (08 Jun 2022)
  - Removed `sprintf-js` from dependencies.
- 1.0.25 (08 Jun 2022)
  - Fixed Flatten method with empty arrays.
- 1.0.23 (03 Jun 2022)
  - Added [debounce](#debounce) function.
  - Added `/` to be replaced in `toCamelCase` `toStudlyCase` and `toSnakeCase`.
- 1.0.22 (10 Feb 2022)
  - Added [Obj.except](#getting-all-object-except-for-certain-keys) method.
- 1.0.21 (28 Jan 2022)
  - Fixed `objOnly` method that adds undefined values if key does not exist on the given object.
- 1.0.19 (15 Jan 2022)
  - Added [Clone objects](#clone-objects) function.
- 1.0.18 (15 Jan 2022)
  - Added [Flatten objects](#flatten-objects) function.

## TODO

- Create tests.
- Implements Array helpers list.
