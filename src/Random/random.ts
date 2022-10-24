const possible =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const Random = {
  /**
   * Get a random integer
   */
  int(min = 1, max = 9999999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * @alias Random.int
   */
  integer(min = 1, max = 9999999): number {
    return this.int(min, max);
  },

  /**
   * Generate random string
   */
  string(length = 32): string {
    let text = "";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },

  /**
   * Generate random id
   */
  id(length = 6, startsWith = "el-"): string {
    return startsWith + Random.string(length);
  },

  /**
   * Generate random boolean value
   */
  bool(): boolean {
    return Random.int(0, 1) === 1;
  },

  /**
   * Alias to bool method
   */
  boolean(): boolean {
    return Random.int(0, 1) === 1;
  },

  /**
   * Get random date
   */
  date(minDate?: Date, maxDate?: Date): Date {
    if (minDate && !maxDate) {
      return new Date(Random.int(minDate.getTime(), Date.now()));
    }

    if (!minDate && maxDate) {
      return new Date(Random.int(0, maxDate.getTime()));
    }

    const now = Date.now();
    return new Date(Random.int(now - 100000000000, now));
  },

  /**
   * Get random color
   */
  color(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  },
};

export default Random;
