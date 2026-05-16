import words from "./words";

/**
 * Convert a string to StudlyCase (PascalCase).
 *
 * @example
 * toStudlyCase("hello-world"); // "HelloWorld"
 * toStudlyCase("ai_agent"); // "AiAgent"
 */
export default function toStudlyCase(string: string): string {
  if (!string) {
    return "";
  }

  return words(string).map(capitalize).join("");
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
