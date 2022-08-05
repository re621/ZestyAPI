export default class Util {
    
    public static readonly isBrowser = typeof process === "undefined";
    
    public static async sleep(timeout: number): Promise<void> {
        return new Promise((resolve) => { setTimeout(() => { resolve(); }, timeout) });
    }
    
    public static encodeArray(input: PrimitiveType[]): string[] {
        const result = [];
        for(const value of input)
            result.push(encodeURIComponent(value + ""));
        return result;
    }
    
    public static btoa(input: string): string {
        if(this.isBrowser) return btoa(input);
        else return Buffer.from(input).toString("base64");
    }
    
    public static atob(input: string): string {
        if(this.isBrowser) return atob(input);
        else return Buffer.from(input, "base64").toString();
    }
}

export type PrimitiveType = string | boolean | number;
