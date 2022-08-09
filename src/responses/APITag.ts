import APIResponse from "./APIResponse";

export interface APITag extends APIResponse {
    id: number;
    name: string;
    post_count: number;
    related_tags: string[];
    related_tags_updated_at: Date;
    category: number;
    is_locked: boolean;
    created_at: Date;
    updated_at: Date;
}

export enum APITagCategory {
    General = 0,
    Artist = 1,
    Copyright = 3,
    Character = 4,
    Species = 5,
    Invalid = 6,
    Meta = 7,
    Lore = 8,
}