type RTypes =
  | "string"
  | "array"
  | "object"
  | "boolean"
  | "number"
  | "auto"
  | null;

const typesMap = {
  string: "RS",
  array: "RA",
  object: "RO",
  boolean: "RB",
  number: "RN",
};

function detectValueType(value): RTypes {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return "array";

  switch (typeof value) {
    case "object":
    case "string":
    case "number":
    case "boolean":
      return typeof value as RTypes;
    default:
      break;
  }
}

export default function R(value, type: RTypes = "auto") {
  if (type === "auto") {
    type = detectValueType(value);
  }

  if (type === null) return value;
  // continue
}
