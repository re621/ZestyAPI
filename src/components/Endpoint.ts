import E621 from "../E621";
import { APIResponse } from "../responses/APIResponse";
import { FormattedResponse, ResponseStatus, ResponseStatusMessage } from "./RequestQueue";
import Util, { PrimitiveMap, PrimitiveType, StringMap } from "./Util";

export default class Endpoint {

    protected api: E621;

    constructor(api: E621) {
        this.api = api;
    }

    /**
     * Validates the search parameters for the `find()` methods.  
     * By default, only checks the limit and page number variables.
     * @param {SearchParams} params Search parameters
     * @param {any} extra Extra data to be passed to the validator
     * @returns {SearchParams} Validated parameters
     */
    protected validateFindParams(params: SearchParams, ...extra: any): SearchParams {
        const results: SearchParams = {};
        if (!params) return results;

        // Result limit
        // - Number between 1 and 320
        if (params.limit && typeof params.limit == "number")
            results.limit = Util.Math.clamp(params.limit, 1, 320);

        // Page number
        // - Number between 1 and 750
        // - OR number prefixed by `a` (after) or `b` (before)
        if (params.page) {
            if (typeof params.page == "number")
                results.page = Util.Math.clamp(params.page, 1, 750);
            else if (typeof params.page == "string" && /[ab]\d+/.test(params.page))
                results.page = params.page;
        }

        return results;
    }

    /**
     * Shortcut method for making a response in case the search parameters are malformed or missing
     * @param {bool} array True if the output expects an array, false otherwise
     * @returns API Response
     */
    protected static makeMalformedRequestResponse(array: boolean = false): Promise<FormattedResponse<any>> {
        return Promise.resolve({
            status: {
                code: 400,
                message: ResponseStatusMessage.MalformedRequest,
                url: null,
            },
            data: array ? [] : null,
        });
    }

    /**
     * Converts a value in a SearchParams format to an object with string values
     * @param {SearchParams} params Original object
     * @param {string} separator Array join separator
     * @returns Flattened object
     */
    protected static flattenSearchParams(params: PrimitiveMap, separator: string = ",", keyReplacement?: StringMap): StringMap {
        let result: StringMap = {};

        for (const [key, value] of Object.entries(params)) {
            result = processValue(result, key, value, keyReplacement, separator, []);
        }

        return result;

        function processValue(
            obj: {},
            key: string,
            value: PrimitiveType | PrimitiveType[] | PrimitiveMap,
            keyReplacement: StringMap = {},
            separator = ",",
            keyStack: string[] = [],
        ): StringMap {

            if (value == null || typeof value == "undefined" || value == "") return obj;
            if (keyReplacement[key]) key = keyReplacement[key];

            // Array
            if (Array.isArray(value)) {
                if (value.length == 0) return;
                obj[formatKey(key, keyStack)] = value.join(separator);
                return obj;
            }

            // Primitive type
            if (typeof value !== "object") {
                obj[formatKey(key, keyStack)] = value + "";
                return obj;
            }

            // Object (recursive)
            keyStack.push(key);
            for (let [key2, value2] of Object.entries(value)) {
                processValue(obj, key2, value2, keyReplacement, separator, keyStack);
            }

            return obj;

            function formatKey(key: string, keyStack = []) {
                if (keyStack.length == 0) return key;
                else {
                    let result = keyStack.shift();
                    for (const parentKey of keyStack)
                        result += "[" + parentKey + "]";
                    result += "[" + key + "]";
                    return result;
                }
            }
        }
    }

    /**
     * Validates the raw API response and returns a consistent response
     * @param {ResponseStatus} status First portion of the API response
     * @param {T} data Second part of the API response
     * @returns 
     */
    protected static formatAPIResponse<T extends APIResponse>(status: ResponseStatus, data: T | T[]): FormattedResponse<T> {
        if (!status.url) status.url = null;
        if (!data) data = null;
        return {
            status: status,
            data: data,
        };
    }
}

/**
 * Search parameters for the `find()` methods.  
 * Only include result limit and page number by default.
 */
export interface SearchParams extends PrimitiveMap {
    /**
     * Number of posts on the page.  
     * Number between 1 and 320, defaults to 75
     */
    limit?: number | 75 | 320,
    /**
     * Page number. Two possible formats:  
     * - Number between 1 and 750, defaults to 1
     * - String, prefixed with either `a` (after)` or `b` (before), followed by an ID
     */
    page?: number | string,
}