import { next } from "./_internal";

const MAX_COLOR = 0x1000000;
const HEX_LENGTH = 6;

/** Internal: random `#rrggbb` hex color. See {@link Random.color}. */
export default function randomColor(): string {
  const value = Math.floor(next() * MAX_COLOR);

  return "#" + value.toString(16).padStart(HEX_LENGTH, "0");
}
