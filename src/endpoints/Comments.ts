import Endpoint, { QueryParams, SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import APIComment from "../responses/APIComment";

export default class CommentsEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Output format changes depending on `group_by` parameter, with `post` being the default.
    - `group_by: post` does not actually work with the search, use `comment` instead
    - Returns an empty object `{ comments: [] }` when no results are found in a search

    */

    public async find(search: CommentSearchParams): Promise<FormattedResponse<APIComment>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("comments.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (response.data.comments) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    // TODO get()

    protected validateSearchParams(params: CommentSearchParams = {}): CommentSearchParams {
        const result = super.validateSearchParams(params) as CommentSearchParams;

        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.body_matches && Validation.isString(params.body_matches)) result.body_matches = params.body_matches;
        if (params.post_tag_match && Validation.isString(params.post_tag_match)) result.post_tag_match = params.post_tag_match;
        if (Validation.isBoolean(params.is_sticky)) result.is_sticky = params.is_sticky;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

    protected validateQueryParams(params: CommentQueryParams = {}): CommentQueryParams {
        const result = super.validateQueryParams(params) as CommentQueryParams;
        result.group_by = "comment";
        return result;
    }

}

interface CommentSearchParams extends SearchParams {
    creator_name?: string,
    body_matches?: string,
    post_tag_match?: string,
    is_sticky?: boolean,
    order?: CommentSearchOrder,
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