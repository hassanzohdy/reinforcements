/**
 * Shuffle value either it is a string or an array
 */
export default function shuffle(value: any[] | string): any[] | string {
  if (!value || (!Array.isArray(value) && typeof value !== "string"))
    return value;

  if (typeof value === "string") {
    return (shuffle(value.split("")) as any[]).join("");
  }

  if (!Array.isArray(value)) return value;

  return value.sort(() => Math.random() - 0.5);
}
