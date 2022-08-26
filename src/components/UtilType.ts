export default class UtilType {

    public static prefix(prefix: string, data: SimpleMap): SimpleMap {
        const result: SimpleMap = {};
        for (const [key, value] of Object.entries(data))
            result[prefix + `[${key}]`] = value;
        return result;
    }
}

export type PrimitiveType = string | boolean | number;
export type SimpleMap = { [prop: string]: PrimitiveType };
export type PrimitiveMap = { [prop: string]: PrimitiveType | PrimitiveType[] | PrimitiveMap };
export type StringMap = { [prop: string]: string };
