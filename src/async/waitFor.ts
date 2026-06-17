import poll, { PollOptions } from "./poll";

export type WaitForOptions = Omit<PollOptions<boolean>, "until">;

/**
 * Resolve once `condition` returns truthy, polling every `interval` ms.
 * A convenience wrapper around `poll` for boolean readiness checks;
 * rejects on `timeout` / `attempts` just like `poll`.
 *
 * @example
 * await waitFor(() => queue.isEmpty(), { interval: 100, timeout: 5000 });
 */
export default async function waitFor(
  condition: (attempt: number) => Promise<boolean> | boolean,
  options: WaitForOptions = {},
): Promise<void> {
  await poll(condition, {
    ...options,
    until: (result: boolean) => Boolean(result),
  });
}
