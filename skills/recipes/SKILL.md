---
name: mongez-reinforcements-recipes
description: |
  Cross-namespace composition recipes for @mongez/reinforcements — real-world patterns combining retry+timeout+pMap, debounce+flush, memoize, walk+diff, lazy circular-import breaking, slug+truncate pipelines, PII masking, and more.
---

# Recipes

Cross-namespace compositions for common real-world tasks. Each recipe is shaped around what you're trying to *do*, not which function it uses.

## Read or write nested fields without losing types

You have a deeply-nested user object and you want to reach into `profile.email` safely — and get back a properly-typed string, not `any`.

```ts
import { get, set, has } from "@mongez/reinforcements";

type User = { id: number; profile: { email: string } };
const u: User = { id: 1, profile: { email: "ada@x.com" } };

get(u, "profile.email");        // typed string
get(u, "profile.email", "n/a"); // typed string, "n/a" fallback
has(u, "profile.email");        // true
set(u, "profile.country", "EG");
```

`get` infers the return type from the path. Compared to `u?.profile?.email`, you also get the default-value branch in one call.

## Fetch many users in parallel, with retries and a deadline

You're hydrating a list of user IDs from an API. Some requests will time out, some will fail transiently, and you don't want to stampede the server with 5,000 simultaneous fetches.

```ts
import { retry, timeout, pMap } from "@mongez/reinforcements";

const safeFetch = (id: string) =>
  retry(
    () => timeout(fetch(`/users/${id}`).then(r => r.json()), 3_000),
    { attempts: 5, delay: 200, backoff: "exponential" },
  );

const users = await pMap(userIds, safeFetch, { concurrency: 5 });
```

`pMap` caps concurrency. `retry` handles transient flakiness. `timeout` ensures no single request hangs the whole batch.

## Autosave a draft while the user types

You're building a text editor that saves to the server. Debounce the save so it fires 500 ms after the last keystroke; flush manually when "Save now" is clicked; cancel pending writes on navigation away.

```ts
import { debounce } from "@mongez/reinforcements";

const autoSave = debounce(payload => api.save(payload), 500, { maxWait: 3_000 });

input.addEventListener("input", e => autoSave(e.target.value));
button.addEventListener("click", () => autoSave.flush());     // "Save now"
window.addEventListener("beforeunload", () => autoSave.cancel());
```

`maxWait: 3_000` guarantees a save fires at least every 3 seconds even if the user types continuously — so no edit can be lost more than 3 s if the tab dies.

## Cache an expensive lookup for one minute

A function that hits the database or an external API, called many times per minute with the same arguments. You want the second call within 60 s to be free.

```ts
import { memoize } from "@mongez/reinforcements";

const lookupUser = memoize(id => db.users.findById(id), { ttl: 60_000 });

await lookupUser("u1");                      // hits DB
await lookupUser("u1");                      // cache (within 60 s)
lookupUser.forget(JSON.stringify(["u1"]));   // invalidate just this key (default key = JSON.stringify(args))
```

`forget(key)` lets you invalidate surgically when a write happens. Without it you'd need a TTL low enough to outpace staleness, which sacrifices the win.

## Audit-log every change between two state snapshots

You're shipping a settings page where every edit must be traced. Diff the old and new objects and emit one audit line per changed field.

```ts
import { walk, diff } from "@mongez/reinforcements";

const changes = diff(prevState, nextState);
for (const key of Object.keys(changes.changed)) {
  audit.log(`${key}: ${changes.changed[key].from} → ${changes.changed[key].to}`);
}
```

`walk` is the read-only sibling — useful for debug-logging the whole tree:

```ts
walk(config, (value, path) => logger.debug(path, value));
```

## Deterministic random data in unit tests

Your test asserts a property of `Random.sample(...)` but the function is non-deterministic. Seed the generator at the top of each test for a stable result.

```ts
import { Random } from "@mongez/reinforcements";

beforeEach(() => Random.seed(42));
afterEach(()  => Random.seed());     // restore non-deterministic mode

test("picks deterministic sample", () => {
  expect(Random.sample([1, 2, 3, 4, 5], 3)).toEqual(/* same every run */);
});
```

Resetting after each test prevents seed bleed if other tests rely on real randomness.

## Break a circular import without restructuring modules

Module A needs B; B needs A. You can't reorder the imports. `lazy` defers the binding capture until first use.

```ts
// a.ts
import { lazy } from "@mongez/reinforcements";
import { B } from "./b";          // b.ts also imports a.ts — circular

const b = lazy(() => B);          // capture binding, defer access

export const A = {
  callB: () => b.resolve().run(),
};
```

The first access calls the factory; subsequent calls return the cached binding. `b.reset()` lets you re-evaluate if the source binding changes (e.g. hot reload).

## Generate a short URL slug from a long title

Blog-post permalinks. The raw title is too long for a URL; you want a clean slug capped at 60 characters, broken at a word boundary.

```ts
import { slugify, truncate, pipe } from "@mongez/reinforcements";

const urlSummary = (title: string) =>
  pipe(title, t => truncate(t, 60, { byWord: true }), t => slugify(t));

urlSummary("How to break circular ES module imports without crying!");
// "how-to-break-circular-es-module-imports-without"
```

`pipe` keeps the order of operations linear — read top-to-bottom instead of nested-function inside-out.

## Log a user object without leaking email or phone

You're shipping an event to your analytics pipeline. PII (email, phone) needs to be masked, and the payload must not carry anything beyond the explicitly-allowed keys.

```ts
import { mask, pick } from "@mongez/reinforcements";

function logUser(user: { id: string; email: string; phone: string }) {
  logger.info(
    pick(
      {
        ...user,
        email: mask(user.email, { start: 2, end: 4 }),
        phone: mask(user.phone, { start: 4, end: 2 }),
      },
      ["id", "email", "phone"],
    ),
  );
}
// Logs e.g.  { id: "u_42", email: "ad****@x.com", phone: "+202********34" }
```

`pick` after the mask is the safety belt — if someone adds a `passwordHash` field to the user shape, it won't accidentally leak because it's not in the allowlist.

## Trace each step of a transform pipeline

You're chasing a bug in a multi-step string transform. Insert a `tap` between steps to log the intermediate value without breaking the pipeline shape.

```ts
import { pipe, tap, trim, toSnakeCase } from "@mongez/reinforcements";

const tokenize = (input: string) =>
  pipe(
    input,
    s => trim(s),
    tap.with(s => log("trimmed:", s)),     // log without consuming
    toSnakeCase,
  );
```

`tap` returns the value untouched after running its side effect — pipeline shape stays linear, debug instrumentation drops in and out at will.

## Layer config sources without duplicating array entries

Boot-time config comes from defaults, then user overrides, then environment overrides. Each layer might contribute to an `allowedHosts` array — you want the union, not the concatenation (which would duplicate).

```ts
import { merge } from "@mongez/reinforcements";

const config = merge(
  defaults,
  userConfig,
  envConfig,
  { arrays: "union" },           // de-dupe across all sources
);
```

`arrays: "union"` builds a `Set` from the concatenated entries — so primitive arrays dedupe cleanly, but **object arrays dedupe by reference**, not by deep equality or a key. If you need shape-based dedup of object arrays, post-process with `unique(arr, "id")` from the arrays skill.

## Render a templated message with nested data

You're sending an email or a notification body. The template uses `{user.name}` placeholders that need to read from a nested object.

```ts
import { template } from "@mongez/reinforcements";

const body = template(
  "Hi {user.name}, you have {count} {kind} waiting.",
  { user: { name: "Ada" }, count: 3, kind: "messages" },
);
// "Hi Ada, you have 3 messages waiting."
```

Dot-notation lookups inside the placeholder map onto the same `get` semantics from the first recipe.

## Generate bracket-notation form names from a schema

You're building an HTML form whose input `name` attributes need to be `user[address][city]` — bracket notation — derived from a nested schema object.

```ts
import { toInputName, flatten } from "@mongez/reinforcements";

const schema = { user: { address: { city: "" }, tags: ["news", "blog"] } };

Object.keys(flatten(schema)).map(toInputName);
// [ "user[address][city]", "user[tags][0]", "user[tags][1]" ]
```

`flatten` produces dot-paths (empty arrays are kept as leaves — populate `tags` with at least one entry if you need indexed names); `toInputName` converts each path to the HTML bracket form. Pair the two when you don't want to hand-author input names alongside the schema.

## Promisify a legacy callback API, with retries

A third-party library uses `(err, result)` callbacks. You want a promise — and because the connection sometimes flakes on first attempt, you want retries on top.

```ts
import { defer, retry } from "@mongez/reinforcements";

const connect = () => {
  const d = defer<Connection>();
  legacy.connect((err, conn) => (err ? d.reject(err) : d.resolve(conn)));
  return d.promise;
};

const conn = await retry(connect, { attempts: 3, delay: 500, backoff: "exponential" });
```

`defer` creates an externally-resolvable promise — useful for any "give me a promise that some other code will settle." `retry` then layers the resilience.

## Search-as-you-type without flooding the backend

A search box that fires an XHR on every keystroke would melt the server. Debounce the async call and let every keystroke await the same in-flight result.

```ts
import { debounceAsync } from "@mongez/reinforcements";

const search = debounceAsync(
  (q: string) => fetch(`/search?q=${q}`).then(r => r.json()),
  250,
);

// User types fast: "a", "ad", "ada"
// Only the final query is fetched; all three awaiters get the same result.
```

Compared to a plain debounce + manual promise plumbing, `debounceAsync` returns a promise that resolves with the *final* call's value — every intermediate caller awaits and receives that same resolution.

## Re-read a lazy value when its source file changes

Config parsed from disk at boot. You want it cached, but you also want a file-watcher to invalidate the cache when the file changes.

```ts
import { lazy } from "@mongez/reinforcements";

const settings = lazy(() => parseConfigFile());

configWatcher.on("change", () => settings.reset());

export const get = (key: string) => settings.resolve()[key];
```

The first `get` parses; subsequent gets read the cached parse; `reset` forces a re-parse on the next access. No global mutable variable, no `if (loaded) …` boilerplate.

## Pick the first defined value (without `||` bugs on `0`)

A port number sourced from CLI input, then env, then default. With `||`, an input port of `0` would silently fall through to the default — a real bug class.

```ts
import { coalesce } from "@mongez/reinforcements";

const port = coalesce(input.port, env.PORT, 3000);
// input.port = 0         → uses 0  (NOT 3000)
// input.port = undefined → falls through to env.PORT
// input.port = null      → falls through to env.PORT
```

`coalesce` distinguishes "no value" from "falsy value" — only `undefined` and `null` count as "no value."

## Strip empty values before posting to an API

A form submission where the user left several optional fields blank. You don't want to send `email: ""` or `prefs: {}` — but you DO want to send `age: 0` (a real value, not absent).

```ts
import { compact } from "@mongez/reinforcements";

const payload = compact({
  name: form.name,
  email: form.email,       // possibly ""        → removed
  phone: form.phone,       // possibly null      → removed
  preferences: form.prefs, // possibly {}        → removed
  age: form.age,           // 0 is valid, kept
});

await api.post("/users", payload);
```

`compact` removes `null`, `undefined`, `""`, `[]`, and `{}` — but keeps numeric `0`, boolean `false`, and any other defined-but-falsy primitives.

## Run four independent fetches in parallel and destructure the results

A page that needs the user, their settings, their home feed, and their unread-count — none depends on the others. Fan out in parallel, destructure when all four resolve.

```ts
import { pProps } from "@mongez/reinforcements";

const { user, settings, home, notifications } = await pProps({
  user:          getUserFromDB(userId),
  settings:      loadSettingsAsync(userId),
  home:          getHomeFeed(userId),
  notifications: getUnreadCount(userId),
});
```

All four requests run in parallel; one rejection rejects the whole thing. Compared to `Promise.all([…])` + array destructuring, `pProps` lets you keep the names visible at the call site instead of relying on positional order.
