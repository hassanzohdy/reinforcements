import flatten from "./flatten";

describe("reinforcements/object/flat", () => {
  it("should return a flatten object", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj)).toEqual({
      a: 1,
      "b.c": 2,
      "b.d.e": 3,
    });
  });

  it("should return a flatten object with custom separator", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/")).toEqual({
      a: 1,
      "b/c": 2,
      "b/d/e": 3,
    });
  });

  it("should return a flatten object with custom separator and parent", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/", false, "root")).toEqual({
      "root/a": 1,
      "root/b/c": 2,
      "root/b/d/e": 3,
    });
  });

  it("should return a flatten object with custom separator and parent and root", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };

    expect(flatten(obj, "/", false, "root", {})).toEqual({
      "root/a": 1,
      "root/b/c": 2,
      "root/b/d/e": 3,
    });
  });

  it("should flatten array", () => {
    const data = [
      { name: "Ahmed", age: 20, numbers: [1, 2], address: { city: "Cairo" } },
      { name: "Ali", age: 30, numbers: [1, 2] },
    ];

    expect(flatten(data)).toEqual({
      "0.name": "Ahmed",
      "0.age": 20,
      "0.numbers.0": 1,
      "0.numbers.1": 2,
      "0.address.city": "Cairo",
      "1.name": "Ali",
      "1.age": 30,
      "1.numbers.0": 1,
      "1.numbers.1": 2,
    });
  });

  it("should flatten objects that has objects of classes with only properties without methods", () => {
    class User {
      name: string;
      age: number;
      usersList: any = [];
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }

      public addNewUser() {
        this.usersList.push(new User("Ahmed S", 255));

        return this;
      }
    }

    const data = {
      user: new User("Ahmed", 20),
      address: {
        city: "Cairo",
      },
    };

    data.user.addNewUser();

    expect(flatten(data)).toEqual({
      "user.name": "Ahmed",
      "user.age": 20,
      "user.usersList.0.name": "Ahmed S",
      "user.usersList.0.age": 255,
      "user.usersList.0.usersList": [],
      "address.city": "Cairo",
    });
  });

  it("should flatten objects that has objects of classes with only properties without methods and keep the original nested objects/arrays", () => {
    class User {
      name: string;
      age: number;
      usersList: any = [];
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }

      public addNewUser() {
        this.usersList.push(new User("Ahmed S", 255));

        return this;
      }
    }

    const data = {
      user: new User("Ahmed", 20),
      address: {
        city: "Cairo",
      },
    };

    data.user.addNewUser();

    expect(flatten(data, ".", true)).toEqual({
      "user.name": "Ahmed",
      "user.age": 20,
      "user.usersList": [
        {
          name: "Ahmed S",
          age: 255,
          usersList: [],
        },
      ],
      "user.usersList.0": {
        name: "Ahmed S",
        age: 255,
        usersList: [],
      },
      "user.usersList.0.name": "Ahmed S",
      "user.usersList.0.age": 255,
      "user.usersList.0.usersList": [],
      "address.city": "Cairo",
      user: {
        name: "Ahmed",
        age: 20,
        usersList: [
          {
            name: "Ahmed S",
            age: 255,
            usersList: [],
          },
        ],
      },
      address: {
        city: "Cairo",
      },
    });
  });
});
