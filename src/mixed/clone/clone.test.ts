import clone from "./clone";

describe("reinforcements/mixed/clone", () => {
  it("should make a deep copy for the given object/array and its nested objects/arrays as well", () => {
    const object = { a: 1, b: { c: 2, d: 3 }, e: [4, 5, 6] };
    const array = [1, 2, 3, { a: 4, b: 5, c: [6, 7, 8] }];

    expect(clone(object)).toEqual(object);
    expect(clone(array)).toEqual(array);
  });

  it("should return the given value if it's not an object/array", () => {
    expect(clone(null)).toEqual(null);
    expect(clone(undefined)).toEqual(undefined);
    expect(clone("")).toEqual("");
    expect(clone(0)).toEqual(0);
    expect(clone(false)).toEqual(false);
    expect(clone(12)).toEqual(12);
  });

  it("should copy more nested arrays of objects", () => {
    const specs = [
      {
        specification: {
          id: 105772446,
          isActive: true,
          createdAt: {
            format: "06-05-2023 02:45:43 AM",
            timestamp: 1683333943,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:43 AM",
            date: "May 6, 2023",
          },
          updatedAt: {
            format: "06-05-2023 02:45:43 AM",
            timestamp: 1683333943,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:43 AM",
            date: "May 6, 2023",
          },
          createdBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          updatedBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          name: [
            { localeCode: "en", value: "Hard Disk" },
            { localeCode: "ar", value: "سعة الهارد" },
          ],
        },
        value: [
          { localeCode: "en", value: "X" },
          { localeCode: "ar", value: "GG" },
        ],
      },
      {
        specification: {
          id: 105763544,
          isActive: true,
          createdAt: {
            format: "06-05-2023 02:45:21 AM",
            timestamp: 1683333921,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:21 AM",
            date: "May 6, 2023",
          },
          updatedAt: {
            format: "06-05-2023 02:45:21 AM",
            timestamp: 1683333921,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:21 AM",
            date: "May 6, 2023",
          },
          createdBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          updatedBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          name: [
            { localeCode: "en", value: "Processor" },
            { localeCode: "ar", value: "المعالج" },
          ],
        },
        value: [
          { localeCode: "en", value: "qF" },
          { localeCode: "ar", value: "f" },
        ],
      },
      {
        specification: {
          id: 105759821,
          isActive: true,
          createdAt: {
            format: "06-05-2023 02:45:10 AM",
            timestamp: 1683333910,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:10 AM",
            date: "May 6, 2023",
          },
          updatedAt: {
            format: "06-05-2023 02:45:10 AM",
            timestamp: 1683333910,
            humanTime: "2 hours ago",
            text: "May 6, 2023 at 2:45:10 AM",
            date: "May 6, 2023",
          },
          createdBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          updatedBy: {
            id: 8,
            isAdmin: true,
            name: "name",
            email: "hassanzohdy@gmail.com",
            userType: "user",
            totalWishlist: 0,
            totalCompare: 0,
          },
          name: [
            { localeCode: "en", value: "Memory" },
            { localeCode: "ar", value: "الذاكرة" },
          ],
        },
        value: [
          { localeCode: "en", value: "q" },
          { localeCode: "ar", value: "z" },
        ],
      },
      {
        specification: {
          id: 2435088,
          isActive: true,
          createdAt: {
            format: "26-04-2023 03:18:49 AM",
            timestamp: 1682471929,
            humanTime: "10 days ago",
            text: "April 26, 2023 at 3:18:49 AM",
            date: "April 26, 2023",
          },
          updatedAt: {
            format: "26-04-2023 03:18:49 AM",
            timestamp: 1682471929,
            humanTime: "10 days ago",
            text: "April 26, 2023 at 3:18:49 AM",
            date: "April 26, 2023",
          },
          name: [
            { localeCode: "en", value: "Speed" },
            { localeCode: "ar", value: "السرعة" },
          ],
        },
        value: [
          { localeCode: "en", value: "w" },
          { localeCode: "ar", value: "s" },
        ],
      },
    ];

    const specs2 = clone(specs);

    specs2[0].specification.name[0].value = "Hard Disk 21";

    expect(
      specs[0].specification.name[0].value ===
        specs2[0].specification.name[0].value,
    ).toBe(false);
  });

  it("should make a proper clone for date object", () => {
    const date = new Date();
    const clonedDate = clone(date);

    expect(date).toEqual(clonedDate);
  });

  it("should clone the object and keep its methods as well", () => {
    class Board {
      constructor(public name: string) {}

      getName() {
        return this.name;
      }
    }
    const object = {
      a: 1,
      board: new Board("Clone Board"),
    };

    expect(clone(object)).toEqual(object);
  });
});
