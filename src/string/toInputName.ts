import rtrim from "./rtrim";

/**
 * Convert the current a dot notation string to compound input name
 * my.input.name >> my[input][name]
 */
export default function toInputName(string: string) {
  if (!string) return "";

  const namesList = string.split(".");
  let mainName = namesList.shift() || "";

  for (let name of namesList) {
    let outBrackets = "";
    if (name.endsWith("[]")) {
      name = rtrim(name, "[]");
      outBrackets = "[]";
    }

    mainName += `[${name}]${outBrackets}`;
  }

  return mainName;
}
