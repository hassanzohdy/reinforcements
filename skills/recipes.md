# Recipes

Cross-namespace compositions for common real-world tasks.

## Typed dot-notation reads / writes

```ts
import { get, set, has } from "@mongez/reinforcements";

type User = { id: number; profile: { email: string } };
const u: User = { id: 1, profile: { email: "ada@x.com" } };

get(u, "profile.email");        // typed string
get(u, "profile.email", "n/a"); // typed string
has(u, "profile.email");        // true
set(u, "profile.country", "EG");
```

## Resilient HTTP — `retry` + `timeout` + `pMap`

```ts
import { retry, timeout, pMap } from "@mongez/reinforcements";

const safeFetch = (id: string) =>
  retry(() => timeout(fetch(`/users/${id}`).then(r => r.json()), 3_000), {
    attempts: 5,
    delay: 200,
    backoff: "exponential",
  });

const users = await pMap(userIds, safeFetch, { concurrency: 5 });
```

## Form submission with cancel & flush

```ts
import { debounce } from "@mongez/reinforcements";

const autoSave = debounce(payload => api.save(payload), 500, { maxWait: 3_000 });

input.addEventListener("input", e => autoSave(e.target.value));
button.addEventListener("click", () => autoSave.flush());     // "Save Now"
window.addEventListener("beforeunload", () => autoSave.cancel());
```

## Cached, time-bounded lookups

```ts
import { memoize } from "@mongez/reinforcements";

const lookupUser = memoize(id => db.users.findById(id), { ttl: 60_000 });

await lookupUser("u1");   // hits DB
await lookupUser("u1");   // cache (within 60s)
lookupUser.forget("u1");  // on update
```

## Object change detection — `walk` + `diff`

```ts
import { walk, diff } from "@mongez/reinforcements";

walk(config, (value, path) => logger.debug(path, value));

const changes = diff(prevState, nextState);
for (const key of Object.keys(changes.changed)) {
  audit.log(`${key}: ${changes.changed[key].from} → ${changes.changed[key].to}`);
}
```

## Reproducible randomness in tests

```ts
import { Random } from "@mongez/reinforcements";

beforeEach(() => Random.seed(42));
afterEach(()  => Random.seed());

test("picks deterministic sample", () => {
  expect(Random.sample([1, 2, 3, 4, 5], 3)).toEqual(/* same every run */);
});
```

## Break a circular import with `lazy`

```ts
// a.ts
import { lazy } from "@mongez/reinforcements";
import { B } from "./b";          // b.ts imports a.ts — circular

const b = lazy(() => B);          // capture binding, defer access

export const A = {
  callB: () => b.resolve().run(),
};
```

## Slug + truncate for URL summaries

```ts
import { slugify, truncate, pipe } from "@mongez/reinforcements";

const urlSummary = (title: string) =>
  pipe(title, t => truncate(t, 60, { byWord: true }), t => slugify(t));

urlSummary("How to break circular ES module imports without crying!");
// "how-to-break-circular-es-module-imports-without"
```

## PII-safe logging

```ts
import { mask, pick } from "@mongez/reinforcements";

function logUser(user: { id: string; email: string; phone: string }) {
  logger.info(
    pick({ ...user, email: mask(user.email, { start: 2, end: 4 }),
                    phone: mask(user.phone, { start: 4, end: 2 }) },
         ["id", "email", "phone"]),
  );
}
```

## Pipeline with side-effect logging

```ts
import { pipe, tap, trim, toSnakeCase } from "@mongez/reinforcements";

const tokenize = (input: string) =>
  pipe(
    input,
    s => trim(s),
    tap.with(s => log("trimmed:", s)),
    toSnakeCase,
  );
```

## Deep merge with array union

```ts
import { merge } from "@mongez/reinforcements";

const config = merge(
  defaults,
  userConfig,
  envConfig,
  { arrays: "union" },           // de-dupe across all sources
);
```

## Templated email body

```ts
import { template } from "@mongez/reinforcements";

const body = template(
  "Hi {user.name}, you have {count} {kind} waiting.",
  { user: { name: "Ada" }, count: 3, kind: "messages" },
);
// "Hi Ada, you have 3 messages waiting."
```

## Form input names from a schema path

```ts
import { toInputName, flatten } from "@mongez/reinforcements";

const schema = { user: { address: { city: "" }, tags: [] as string[] } };

Object.keys(flatten(schema)).map(toInputName);
// [ "user[address][city]", "user[tags][0]" ]
```

## Defer + retry — bridge a callback API

```ts
import { defer, retry } from "@mongez/reinforcements";

const connect = () => {
  const d = defer<Connection>();
  legacy.connect((err, conn) => (err ? d.reject(err) : d.resolve(conn)));
  return d.promise;
};

const conn = await retry(connect, { attempts: 3, delay: 500, backoff: "exponential" });
```

## Burst-tolerant search

```ts
import { debounceAsync } from "@mongez/reinforcements";

const search = debounceAsync(
  (q: string) => fetch(`/search?q=${q}`).then(r => r.json()),
  250,
);

// User types fast: "a", "ad", "ada"
// Only the final query is fetched; all three awaiters get the same result.
```

## Reset-on-config-reload

```ts
import { lazy } from "@mongez/reinforcements";

const settings = lazy(() => parseConfigFile());

configWatcher.on("change", () => settings.reset());

export const get = (key: string) => settings.resolve()[key];
```

## Coalesce defaults without `||` falsy bugs

```ts
import { coalesce } from "@mongez/reinforcements";

const port = coalesce(input.port, env.PORT, 3000);
// input.port = 0 → uses 0 (not 3000)
// input.port = undefined → falls through
```

## Clean an API payload before sending

```ts
import { compact } from "@mongez/reinforcements";

const payload = compact({
  name: form.name,
  email: form.email,       // possibly ""
  phone: form.phone,       // possibly null
  preferences: form.prefs, // possibly {}
  age: form.age,           // 0 is valid, kept
});

await api.post("/users", payload);
```

## Parallel destructuring with `pProps`

```ts
import { pProps } from "@mongez/reinforcements";

const { user, settings, home, notifications } = await pProps({
  user:          getUserFromDB(userId),
  settings:      loadSettingsAsync(userId),
  home:          getHomeFeed(userId),
  notifications: getUnreadCount(userId),
});

// All four requests run in parallel; one rejection rejects the whole thing.
```
