import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import { APIForumCategoryID, APIForumTopic } from "../responses/APIForumTopic";

export default class ForumTopicsEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    public ForumCategory = APIForumCategoryID;

    public async find(search: ForumTopicSearchParams = {}): Promise<FormattedResponse<APIForumTopic[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("forum_topics.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (!response.data || response.data.length == 0) {
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

    protected validateSearchParams(params: ForumTopicSearchParams = {}): ForumTopicSearchParams {
        const results = super.validateSearchParams(params) as ForumTopicSearchParams;

        if (params.id && (Array.isArray(params.id) || Validation.isInteger(params.id))) results.id = params.id;
        if (params.title && Validation.isString(params.title)) results.title = params.title;
        if (params.title_matches && Validation.isString(params.title_matches)) results.title_matches = params.title_matches;
        if (Validation.isBoolean(params.is_sticky)) results.is_sticky = params.is_sticky;
        if (Validation.isBoolean(params.is_hidden)) results.is_hidden = params.is_hidden;
        if (params.category_id && Validation.isInteger(params.category_id)) results.category_id = params.category_id;

        return results;
    }

}

interface ForumTopicSearchParams extends SearchParams {
    id?: number | number[],
    title?: string,         // Exact match
    title_matches?: string, // Fuzzy
    is_sticky?: boolean,
    is_hidden?: boolean,
    category_id?: number,
}