import Endpoint, { QueryParams, SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import Validation from "../components/Validation";
import APIComment from "../responses/APIComment";

export default class CommentsEndpoint extends Endpoint<APIComment> {

    /*
    Endpoint Notes

    - Output format changes depending on `group_by` parameter, with `post` being the default.
    - `group_by: post` does not actually work with the search, use `comment` instead
    - Returns an empty object `{ comments: [] }` when no results are found in a search

    */

    protected endpoint = "comments";
    public find(search: CommentSearchParams = {}): Promise<FormattedResponse<APIComment[]>> { return super.find(search); }

    // TODO get()

    protected validateSearchParams(params: CommentSearchParams = {}): CommentSearchParams {
        const result = super.validateSearchParams(params) as CommentSearchParams;

        // Native
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.body_matches && Validation.isString(params.body_matches)) result.body_matches = params.body_matches;
        if (params.post_tag_match && Validation.isString(params.post_tag_match)) result.post_tag_match = params.post_tag_match;
        if (Validation.isBoolean(params.is_hidden)) result.is_hidden = params.is_hidden;
        if (Validation.isBoolean(params.is_sticky)) result.is_sticky = params.is_sticky;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        // Derived
        if (params.id && Validation.isInteger(params.id)) result.id = params.id;
        if (params.post_id && Validation.isInteger(params.post_id)) result.post_id = params.post_id;
        if (params.creator_id && Validation.isInteger(params.creator_id)) result.creator_id = params.creator_id;

        return result;
    }

    protected validateQueryParams(params: CommentQueryParams = {}): CommentQueryParams {
        const result = super.validateQueryParams(params) as CommentQueryParams;
        result.group_by = "comment";
        return result;
    }

}

interface CommentSearchParams extends SearchParams {
    // Native
    creator_name?: string,
    body_matches?: string,
    post_tag_match?: string,
    is_hidden?: boolean,
    is_sticky?: boolean,
    order?: CommentSearchOrder,

    // Derived
    id?: number,
    post_id?: number,
    creator_id?: number,
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