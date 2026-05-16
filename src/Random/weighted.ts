import { next } from "./_internal";

export type WeightedItem<T> = {
  value: T;
  weight: number;
};

/** Internal: weighted choice. See {@link Random.weighted}. */
export default function randomWeighted<T>(
  items: ReadonlyArray<WeightedItem<T>>,
): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const total = items.reduce(
    (sum, item) => sum + Math.max(0, item.weight),
    0,
  );

  if (total <= 0) {
    return undefined;
  }

  let target = next() * total;

  for (const item of items) {
    target -= Math.max(0, item.weight);

    if (target <= 0) {
      return item.value;
    }
  }

  return items[items.length - 1].value;
}
