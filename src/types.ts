export type GenericObject = Record<string, any>;

export const Operators = [
  "=",
  "equals",
  ">",
  "gt",
  "<",
  "lt",
  ">=",
  "gte",
  "<=",
  "lte",
  "!=",
  "not",
  "notEquals",
  "like",
  "%",
  "not like",
  "!%",
  "in",
  "not in",
  "between",
  "<>",
  "not between",
  "!<>",
  "is",
  "typeof",
  "is not",
  "!is",
  "not typeof",
  "is a",
  "instanceof",
  "not instanceof",
  "!instanceof",
  "is not a",
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
  null,
  "null",
  "is null",
  "is not null",
  !null,
  "!null",
  "!not null",
  "is empty",
  "is not empty",
  "!empty",
  "true",
  "is true",
  true,
  !true,
  "is not true",
  "!true",
  false,
  !false,
  "!false",
  "is not false",
  undefined,
  "is undefined",
  "is not undefined",
  !undefined,
  "!undefined",
] as const;

export type ComparisonOperator = typeof Operators[number];
