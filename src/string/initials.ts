/**
 * Get the initials of the given name
 */
export default function initials(name: string, separator = ""): string {
  if (!name) return "";

  if (typeof name !== "string") {
    throw new Error("The name must be a string");
  }

  return name
    .split(" ")
    .map(name => name.charAt(0))
    .join(separator);
}
