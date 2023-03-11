/**
 * Generate array of numbers starting from the given min value to the given max value
 */
export default function range(min: number, max: number) {
  if (typeof min !== "number") {
    throw new Error(`min parameter should be number, "${typeof min}" given.`);
  }

  if (typeof max !== "number") {
    throw new Error(`max parameter should be number, "${typeof max} given."`);
  }

  if (min >= max) {
    throw new Error("max parameter should be higher than min parameter");
  }
  const array: number[] = [];

  for (let i = min; i <= max; i++) {
    array.push(i);
  }

  return array;
}
