import APIPostGroup from "./APIPostGroup";

export default interface APIPool extends APIPostGroup {
    id: number;

    is_active: boolean;
    category: APIPoolCategory;
    creator_name: string;
}

export enum APIPoolCategory {
    Series = "series",
    Collection = "collection",
}