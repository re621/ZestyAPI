import APIResponse, { APIWarnedMessage } from "./APIResponse";

export default interface APIComment extends APIResponse, APIWarnedMessage {
    id: number;
    created_at: string;
    post_id: number;
    creator_id: number;
    body: string;
    score: number;
    updated_at: string;
    updater_id: number;
    do_not_bump_post: boolean;
    is_hidden: boolean;
    is_sticky: boolean;
    creator_name: string;
    updater_name: string;
}