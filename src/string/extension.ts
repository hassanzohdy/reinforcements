/**
 * Get the extension of the file name
 */
export default function extension(string: string): string {
  if (!string) return "";
  const regex = /(?:\.([^.]+))?$/,
    extension = regex.exec(string);

  return extension ? extension[1] : "";
}
