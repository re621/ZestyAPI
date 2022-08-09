export default class UtilMath {

    /**
     * Ensures that the first provided value is bigger than the second, but smaller than the third
     * @param {number} cur Value being evaluated
     * @param {number} min Minimum possible value
     * @param {number} max Maximum possible value
     * @returns {number} final result
     */
    public static clamp(cur: number, min: number, max: number): number {
        return Math.min(Math.max(cur, min), max);
    }

    /**
     * Boolean version of `clamp()`.  
     * Returns true as long as the first value is bigger than the second, but smaller than the third
     * @param {number} cur Value being evaluated
     * @param {number} min Minimum possible value
     * @param {number} max Maximum possible value
     * @returns {boolean} `true` if the conditions match, `false` otherwise
     */
    public static between(cur: number, min: number, max: number): boolean {
        return min <= cur && max >= cur;
    }

    /**
     * Rounds the provided number to a specified decimal place
     * @param {number} value Value being evaluated
     * @param {number} decimal Decimal place
     * @returns {number} Rounded number
     */
    public static round(value: number, decimal = 2): number {
        if (decimal == 0) return parseInt(value.toFixed(decimal));
        else return parseFloat(value.toFixed(decimal));
    }

}