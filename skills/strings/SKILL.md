---
name: mongez-reinforcements-strings
description: |
  String utilities from @mongez/reinforcements — case conversion, trimming, slugify, truncate, mask, template interpolation, HTML helpers, and Arabic detection.
---
# Strings

Casing, trimming, replacement, padding, slugify, truncate, mask, template, HTML helpers, Arabic detection. Import from `@mongez/reinforcements`.

## Casing — powered by `words()`

All casing functions share a single tokenizer that handles **acronyms correctly**.

#### `words`

```ts
words(input: string): string[]
```

```ts
words("XMLHttpRequest");  // ["XML", "Http", "Request"]
words("AIAgent");         // ["AI", "Agent"]
words("hello-world");     // ["hello", "world"]
```

#### Casing family

| Function | Signature | Example |
|---|---|---|
| `toCamelCase` | `(str) => string` | `toCamelCase("XMLHttpRequest")` → `"xmlHttpRequest"` |
| `toStudlyCase` | `(str) => string` | `toStudlyCase("hello-world")` → `"HelloWorld"` |
| `toPascalCase` | `(str) => string` | Alias of `toStudlyCase` |
| `toSnakeCase` | `(str, separator?, lowerAll?) => string` | `toSnakeCase("AIAgent")` → `"ai_agent"` |
| `toKebabCase` | `(str, lowerAll?) => string` | `toKebabCase("getUserID")` → `"get-user-id"` |
| `toConstantCase` | `(str) => string` | `toConstantCase("apiBaseUrl")` → `"API_BASE_URL"` |
| `toDotCase` | `(str, lowerAll?) => string` | `toDotCase("helloWorld")` → `"hello.world"` |
| `toPathCase` | `(str, lowerAll?) => string` | `toPathCase("helloWorld")` → `"hello/world"` |
| `toTitleCase` | `(str, options?: { stopWords? }) => string` | `toTitleCase("the lord of rings")` → `"The Lord of Rings"` |

## Letter case primitives

```ts
ucfirst(str: string): string                 // uppercase first char
capitalize(str: string): string              // ucfirst on every whitespace-separated word
```

```ts
ucfirst("hello");          // "Hello"
capitalize("hello world"); // "Hello World"
```

## Trimming

| Function | Signature | Notes |
|---|---|---|
| `trim` | `(str, needle?: string) => string` | Trims both ends (default whitespace) |
| `ltrim` | `(str, needle?: string) => string` | Start only |
| `rtrim` | `(str, needle?: string) => string` | End only |

```ts
trim("  hi  ");          // "hi"
trim("---hi---", "-");   // "hi"
ltrim("//path", "/");    // "path"
rtrim("file.tmp", ".tmp"); // "file"
```

## Replacement family

```ts
replaceAll(str, search, replacement): string
replaceFirst(str, search, replacement): string
replaceLast(str, search, replacement): string
removeFirst(str, needle): string     // = replaceFirst(str, needle, "")
removeLast(str, needle): string      // = replaceLast(str, needle, "")
```

`search`/`needle` are **literal strings** — they're regex-escaped internally.

```ts
replaceAll("a-b-c", "-", "_");        // "a_b_c"
replaceFirst("foo foo foo", "foo", "bar"); // "bar foo foo"
replaceLast("foo bar foo", "foo", "baz");  // "foo bar baz"
```

#### `repeatsOf`

```ts
repeatsOf(str: string, needle: string, caseSensitive?: boolean): number  // default true
```

```ts
repeatsOf("abcabc", "a");       // 2
repeatsOf("AbcAbc", "a", false); // 2
```

## Padding

```ts
pad(str, length, char?): string         // pad both sides; extra char goes to end
padStart(str, length, char?): string    // typed wrapper around String#padStart
padEnd(str, length, char?): string      // typed wrapper around String#padEnd
```

```ts
pad("hi", 6);       // "  hi  "
pad("hi", 7, "*");  // "**hi***"
padStart("7", 3, "0"); // "007"
padEnd("7", 3, "0");   // "700"
```

## URL slugs & truncation

#### `slugify`

```ts
slugify(str, options?: {
  separator?: string;  // default "-"
  lower?: boolean;     // default true
  strict?: boolean;    // default true — strip non-alphanumeric per token
}): string
```

```ts
slugify("Hello, World!");                  // "hello-world"
slugify("café crème");                     // "cafe-creme"
slugify("Hello World", { separator: "_" }); // "hello_world"
```

#### `truncate`

```ts
truncate(str, length, options?: {
  suffix?: string;                  // default "..."
  byWord?: boolean;                 // default false — cut at word boundary
  position?: "end" | "middle";      // default "end"
}): string
```

```ts
truncate("hello world", 8);                          // "hello..."
truncate("hello world there", 14, { byWord: true }); // "hello world..."
truncate("abcdefghij", 7, { position: "middle" });   // "ab...ij"
```

#### `readMoreChars` / `readMoreWords`

```ts
readMoreChars(str, length, suffix?: string): string  // default suffix "..."
readMoreWords(str, wordCount, suffix?: string): string
```

```ts
readMoreChars("hello world", 5);     // "hello..."
readMoreWords("a b c d e", 3);       // "a b c..."
```

## HTML & masking

#### `escapeHtml` / `unescapeHtml`

```ts
escapeHtml(str: string): string   // & < > " ' → entities
unescapeHtml(str: string): string // reverse
```

```ts
escapeHtml('<a href="x">');  // "&lt;a href=&quot;x&quot;&gt;"
```

#### `stripHtmlTags`

```ts
stripHtmlTags(str, options?: {
  replacement?: string;              // default ""
  stripScriptsAndStyles?: boolean;   // default true — drops content too
  stripComments?: boolean;           // default true
}): string
```

**Not a sanitizer** — for untrusted HTML, use DOMPurify.

```ts
stripHtmlTags("<p>Hello <b>world</b></p>");        // "Hello world"
stripHtmlTags("<script>alert(1)</script>safe");    // "safe"
stripHtmlTags("<p>hi</p>", { replacement: " " });  // " hi "
```

#### `mask`

```ts
mask(str, options?: {
  start?: number;  // visible chars from start, default 0
  end?: number;    // visible chars from end, default 0
  char?: string;   // mask char, default "*"
}): string
```

```ts
mask("4242424242424242", { start: 0, end: 4 });  // "************4242"
mask("hassan@gmail.com", { start: 2, end: 4 }); // "ha**********.com"
```

## Templates

#### `template`

```ts
template(str: string, vars: Record<string, any>): string
```

`{path}` interpolation with **dot-notation paths** into `vars`. Missing paths render as `""`.

```ts
template("Hello {user.name}!", { user: { name: "Ada" } });
// "Hello Ada!"

template("{count} items", { count: 3 });
// "3 items"
```

## Counting & reversal

```ts
wordCount(str: string): number
charCount(str: string, options?: { unicode?: boolean }): number  // grapheme-aware when true
reverse(str: string): string  // unicode-safe (handles surrogate pairs)
```

```ts
wordCount("hello world");          // 2
charCount("hello");                // 5
charCount("👨‍👩", { unicode: true }); // 1 (single grapheme)
reverse("hello");                  // "olleh"
```

## Misc

#### `initials`

```ts
initials(name: string, separator?: string): string  // default separator ""
```

```ts
initials("Ada Lovelace");      // "AL"
initials("Ada Lovelace", "."); // "A.L"
```

#### `extension`

```ts
extension(filename: string): string
```

Returns the part after the last dot, or `""` if absent.

```ts
extension("foo.txt");          // "txt"
extension("archive.tar.gz");   // "gz"
extension("README");           // ""
```

#### `toInputName`

```ts
toInputName(path: string): string
```

`"a.b.c"` → `"a[b][c]"` for HTML form `name` attributes.

```ts
toInputName("user.address.city"); // "user[address][city]"
toInputName("user.tags[]");        // "user[tags][]"
```

## Arabic

```ts
startsWithArabic(str: string, trimmed?: boolean): boolean  // default trimmed = true
containsArabic(str: string): boolean
ARABIC_REGEX: RegExp                                       // /[؀-ۿ]/
ARABIC_PATTERN: RegExp                                     // @deprecated — same as ARABIC_REGEX
```

```ts
startsWithArabic("مرحبا");        // true
startsWithArabic("   مرحبا");     // true (trimmed)
containsArabic("hello مرحبا");    // true
```
