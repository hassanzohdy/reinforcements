import { studentsClasses } from "tests/data";
import groupBy from "./groupBy";

test("Group by key", () => {
  const studentsGroupedByClass = groupBy(studentsClasses, "class");

  expect(studentsGroupedByClass.length).toEqual(3);
  expect(studentsGroupedByClass[0].class).toEqual("A");

  /**
   * Expected Results
  [
    {
      class: "A",
      data: [
        {
          id: 1,
          class: "A",
          grade: 1,
        },
        {
          id: 3,
          class: "A",
          grade: 3,
        },
      ],
    },
  ];
   */
});

test("Group by multiple keys", () => {
  const studentsGroupedByClassAndGrade = groupBy(studentsClasses, [
    "class",
    "grade",
  ]);

  expect(studentsGroupedByClassAndGrade.length).toEqual(4);
  expect(studentsGroupedByClassAndGrade[0].class).toEqual("A");
  expect(studentsGroupedByClassAndGrade[0].grade).toEqual(1);

  /**
   * Expected Results
  [
    {
      class: "A",
      grade: 1,
      data: [
        {
          id: 1,
          class: "A",
          grade: 1,
        },
      ],
    },
    {
      class: "A",
      grade: 3,
      data: [
        {
          id: 3,
          class: "A",
          grade: 3,
        }
      ]
    }
  ];
   */
});
