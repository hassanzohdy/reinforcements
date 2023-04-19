import { orders, studentsClasses } from "tests/data";
import groupBy from "./groupBy";

test("Group by key", () => {
  const studentsGroupedByClass = groupBy(studentsClasses, "class");

  expect(studentsGroupedByClass.length).toEqual(3);
  expect(studentsGroupedByClass[0].class).toEqual("A");
});

test("Group by nested key", () => {
  const groupedOrdersByPrice = groupBy(orders, "total.price");

  expect(groupedOrdersByPrice.length).toEqual(3);
});

test("Group by multiple keys", () => {
  const studentsGroupedByClassAndGrade = groupBy(studentsClasses, [
    "class",
    "grade",
  ]);

  expect(studentsGroupedByClassAndGrade.length).toEqual(4);
  expect(studentsGroupedByClassAndGrade[0].class).toEqual("A");
  expect(studentsGroupedByClassAndGrade[0].grade).toEqual(1);
});
