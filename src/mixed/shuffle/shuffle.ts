/**
 * Shuffle array items
 */
export default function shuffle(array: any[] | string): any[] | string {
  if (typeof array === "string") {
    return (shuffle(array.split("")) as any[]).join("");
  }

  if (!Array.isArray(array)) return array;

  return array.sort(() => Math.random() - 0.5);
}
