export type FormatDurationOptions = {
  /**
   * Maximum number of unit parts to show, counting from the largest
   * non-zero unit down. Default: `Infinity` (show every non-zero unit).
   */
  units?: number;
  /** Long labels (`"1 hour 2 minutes"`) instead of short (`"1h 2m"`). Default: `false`. */
  long?: boolean;
  /** Separator between unit parts. Default: `" "`. */
  separator?: string;
};

const UNITS: Array<{ ms: number; short: string; singular: string; plural: string }> = [
  { ms: 86400000, short: "d", singular: "day", plural: "days" },
  { ms: 3600000, short: "h", singular: "hour", plural: "hours" },
  { ms: 60000, short: "m", singular: "minute", plural: "minutes" },
  { ms: 1000, short: "s", singular: "second", plural: "seconds" },
  { ms: 1, short: "ms", singular: "millisecond", plural: "milliseconds" },
];

/**
 * Format a millisecond duration as a human-readable string. By default
 * every non-zero unit (days → milliseconds) is shown; cap the number of
 * parts with `units`.
 *
 * @example
 * formatDuration(3661000);                // "1h 1m 1s"
 * formatDuration(3661000, { units: 2 });  // "1h 1m"
 * formatDuration(90000, { long: true });  // "1 minute 30 seconds"
 */
export default function formatDuration(
  ms: number,
  options: FormatDurationOptions = {},
): string {
  if (!Number.isFinite(ms)) {
    return String(ms);
  }

  const maxUnits = options.units ?? Infinity;
  const long = options.long ?? false;
  const separator = options.separator ?? " ";

  const sign = ms < 0 ? "-" : "";
  let remaining = Math.abs(Math.trunc(ms));

  if (remaining === 0) {
    return long ? "0 milliseconds" : "0ms";
  }

  const parts: string[] = [];

  for (const unit of UNITS) {
    if (parts.length >= maxUnits) {
      break;
    }

    const amount = Math.floor(remaining / unit.ms);

    if (amount === 0) {
      continue;
    }

    remaining -= amount * unit.ms;

    if (long) {
      parts.push(`${amount} ${amount === 1 ? unit.singular : unit.plural}`);
    } else {
      parts.push(`${amount}${unit.short}`);
    }
  }

  return sign + parts.join(separator);
}
