import APIResponse from "./APIResponse";

export interface APIForumTopic extends APIResponse {
    id: number;
    creator_id: number;
    updater_id: number;
    title: string;
    response_count: number;
    is_sticky: boolean;
    is_locked: boolean;
    is_hidden: boolean;
    created_at: string;
    updated_at: string;
    category_id: APIForumCategoryID;
}

export enum APIForumCategoryID {
    General = 1,
    AIBUR = 2,
    ArtTalk = 3,
    OffTopic = 5,
    ThingsHappen = 6,
    JanitorsLounge = 8,
    ToolsAndApps = 9,
    TagProjects = 10,
    BugReports = 11,
}
