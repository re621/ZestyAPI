import Endpoint, { QueryParams, SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import APIComment from "../responses/APIComment";

export default class CommentsEndpoint extends Endpoint<APIComment> {

    /*
    Endpoint Notes

    - Output format changes depending on `group_by` parameter, with `post` being the default.
    - `group_by: post` does not actually work with the search, use `comment` instead
    - Returns an empty object `{ comments: [] }` when no results are found in a search

    */

    protected endpoint = "comments";
    protected searchParams = [
        "creator_name", "body_matches", "post_tags_match", "is_hidden", "is_sticky", "order",    // Native
        "id", "post_id", "creator_id",                                                          // Derived
    ];
    protected searchParamAliases = {
        "body": "body_matches",
        "post_tags": "post_tags_match",
    }
    public find(search: CommentSearchParams = {}): Promise<FormattedResponse<APIComment[]>> { return super.find(search); }

    // TODO get()

    protected validateQueryParams(params: CommentQueryParams = {}): CommentQueryParams {
        const result = super.validateQueryParams(params) as CommentQueryParams;
        result.group_by = "comment";
        return result;
    }

}

interface CommentSearchParams extends SearchParams {
    // Native
    creator_name?: string,
    /// body_matches?: string,
    /// post_tags_match?: string,
    is_hidden?: boolean,
    is_sticky?: boolean,
    order?: CommentSearchOrder,

    // Derived
    id?: number | number[],
    post_id?: number | number[],
    creator_id?: number,

    // Aliases
    body?: string,
    post_tags?: string,
}

interface CommentQueryParams extends QueryParams {
    group_by?: "comment" | "post" | string,
}

enum CommentSearchOrder {
    Created = "id_desc",
    Updated = "updated_at_desc",
    Score = "score_desc",
    Post = "post_id_desc",
}