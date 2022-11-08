import escapeRegex from "./escapeRegex";

describe("mongez/reinforcements/escapeRegex", () => {
  it("should escape the regex of the given string", () => {
    expect(escapeRegex("test")).toBe("test");
  });

  it("should escape the regex of the given string", () => {
    expect(escapeRegex("test*")).toBe("test\\*");
    expect(
      escapeRegex(
        "This is a string with special characters like: . * + ? ^ $ { } ( ) | [ ] / \\",
      ),
    ).toBe(
      "This is a string with special characters like: \\. \\* \\+ \\? \\^ \\$ \\{ \\} \\( \\) \\| \\[ \\] / \\\\",
    );
  });
});
