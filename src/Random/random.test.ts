import Random from "./random";

describe("reinforcements/random", () => {
  it("should generate random integer", () => {
    for (let i = 0; i < 100; i++) {
      const random = Random.integer(0, 100);
      expect(random).toBeGreaterThanOrEqual(0);
      expect(random).toBeLessThanOrEqual(100);
    }
  });
  it("should generate random string", () => {
    for (let i = 0; i < 100; i++) {
      const length = Random.integer(1, 100);
      const randomString = Random.string(length);
      expect(randomString.length).toBe(length);
      expect(randomString).toMatch(/^[a-zA-Z0-9]+$/);
    }
  });
  it("should generate random id", () => {
    for (let i = 0; i < 100; i++) {
      const randomId = Random.id();
      expect(randomId).toMatch(/^el-[a-zA-Z0-9]{6}$/);
      const length = Random.int(1, 100);
      const randomId2 = Random.id(length);
      expect(randomId2).toMatch(new RegExp(`^el-[a-zA-Z0-9]{${length}}$`));
    }
  });
  it("should generate random boolean", () => {
    for (let i = 0; i < 100; i++) {
      const randomBool = Random.bool();
      expect(randomBool).toBe(randomBool);
    }
  });
  it("should generate random date", () => {
    for (let i = 0; i < 100; i++) {
      const randomDate = Random.date();
      expect(randomDate).toBeInstanceOf(Date);
    }
  });
  it("should generate random color", () => {
    for (let i = 0; i < 100; i++) {
      const randomColor = Random.color();
      expect(randomColor).toMatch(/^#[a-zA-Z0-9]{3,6}$/);
    }
  });
});
