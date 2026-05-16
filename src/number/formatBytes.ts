export type FormatBytesOptions = {
  /** Decimal places. Default: `2`. */
  decimals?: number;
  /** Use binary (1024) units instead of decimal (1000). Default: `false`. */
  binary?: boolean;
};

const DECIMAL_UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const DECIMAL_BASE = 1000;
const BINARY_BASE = 1024;

/**
 * Format a byte count as a human-readable string.
 *
 * @example
 * formatBytes(1500); // "1.50 KB"
 * formatBytes(1500, { binary: true }); // "1.46 KiB"
 */
export default function formatBytes(
  bytes: number,
  options: FormatBytesOptions = {},
): string {
  if (!Number.isFinite(bytes)) {
    return String(bytes);
  }

  const decimals = options.decimals ?? 2;
  const binary = options.binary ?? false;
  const base = binary ? BINARY_BASE : DECIMAL_BASE;
  const units = binary ? BINARY_UNITS : DECIMAL_UNITS;

  if (bytes === 0) {
    return `0 ${units[0]}`;
  }

  const sign = bytes < 0 ? "-" : "";
  const abs = Math.abs(bytes);
  const exponent = Math.min(
    Math.floor(Math.log(abs) / Math.log(base)),
    units.length - 1,
  );

  const value = abs / Math.pow(base, exponent);

  return `${sign}${value.toFixed(decimals)} ${units[exponent]}`;
}
