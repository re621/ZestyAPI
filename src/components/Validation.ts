export default class Validation {

    /**
     * Checks if the provided value is a string
     * @param {string} value Value being evaluated
     * @returns `true` if the value is a string, `false` otherwise
     */
    public static isString(value: string): boolean {
        return typeof value == "string" && value.length > 0;
    }

    /**
     * Determines if the provided string is a number
     * @param {string} value Value being evaluated
     * @returns `true` if the value is a number, `false` otherwise
     */
    public static isNumeric(value: string): boolean {
        return !isNaN(Number(value));
    }

    /**
     * Checks if the provided value is an integer
     * @param {number} value Value being evaluated
     * @returns `true` if the value is an integer, `false` otherwise
     */
    public static isInteger(value: number): boolean {
        return Number.isInteger(value);
    }

    /**
     * Checks if the provided value is an integer
     * @param {any} value Value being evaluated
     * @returns `true` if the value is a boolean, `false` otherwise
     */
    public static isBoolean(value: boolean): boolean {
        return typeof value == "boolean" || value === "true" || value === "false";
    }

    /**
     * Checks if the provided value is an object
     * @param {any} value Value being evaluated
     * @param {boolean} array If set to `true`, arrays will not be considered objects
     * @returns `true` if the value is an object, `false` otherwise
     */
    public static isObject(value: any, array = false): boolean {
        if (array && this.isArray(value)) return true;
        return typeof value == "object";
    }

    /**
     * Checks if the provided value is an array
     * @param {any} value Value being evaluated
     * @returns `true` if the value is an array, `false` otherwise
     */
    public static isArray(value: any): boolean {
        return Array.isArray(value);
    }

}