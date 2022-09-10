let timeoutId: NodeJS.Timeout | undefined;

export default function debounce(callback: () => void, wait = 0) {
  // Clear previous delayed action, if existent
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }

  // Start new delayed action for latest call
  timeoutId = setTimeout(() => {
    callback();
    timeoutId = undefined; // Clear timeout
  }, wait);
}
