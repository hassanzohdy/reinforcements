/**
 * Map the given object into an array
 */
export default function map(
  object: any,
  callback: (key: string, value: any, object: any) => any,
): any[] {
  return Object.keys(object).map(key => {
    return callback(key, object[key], object);
  });
}
