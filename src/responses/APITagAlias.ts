import { APIResponse } from "./APIResponse";

export interface APITagAlias extends APIResponse {
    id: number,
    antecedent_name: string,
    consequent_name: string,
    reason: string,
    status: string,
    creator_id: number,
    approver_id: number,

    forum_post_id: number | null,
    forum_topic_id: number | null,

    created_at: Date,
    updated_at: Date,
}

export enum APITagAliasStatus {
    Approved = "approved",
    Active = "active",
    Pending = "pending",
    Deleted = "deleted",
    Retired = "retired",
    Processing = "processing",
    Queued = "queued",
}