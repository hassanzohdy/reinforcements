import template from "./template";

describe("reinforcements/string/template", () => {
  it("interpolates flat keys", () => {
    expect(template("Hello {name}!", { name: "Ada" })).toBe("Hello Ada!");
  });

  it("supports dot-notation paths", () => {
    expect(
      template("{user.name} is {user.age}", {
        user: { name: "Ada", age: 36 },
      }),
    ).toBe("Ada is 36");
  });

  it("renders missing keys as empty", () => {
    expect(template("Hello {missing}!", {})).toBe("Hello !");
  });
});
