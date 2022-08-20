export default class Random {
  /**
   * Get a random integer
   *
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
  static int(min = 1, max = 9999999): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random string
   *
   * @param  {number} length
   * @param  {string} startsWith
   * @return {string}
   */
  static string(length = 32): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  /**
   * Generate random id
   *
   * @param  {number} length
   * @param  {string} startsWith
   * @return {string}
   */
  static id(length = 6, startsWith = "el-"): string {
    return startsWith + Random.string(length);
  }

  /**
   * Generate random boolean value
   */
  static bool(): boolean {
    return Random.int(0, 1) === 1;
  }

  /**
   * Alias to bool method
   *
   * @alias bool
   */
  static boolean(): boolean {
    return Random.bool();
  }
}
