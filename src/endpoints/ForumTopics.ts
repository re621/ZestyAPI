import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import { APIForumCategoryID, APIForumTopic } from "../responses/APIForumTopic";

export default class ForumTopicsEndpoint extends Endpoint<APIForumTopic> {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    public Category = APIForumCategoryID;
    protected searchParams = [
        "id", "title_matches", "is_sticky", "is_hidden", "category_id",
    ];
    protected searchParamAliases = {
        "title": "title_matches",   // `title` is valid, but not terribly useful
    };

    public async find(search: ForumTopicSearchParams = {}): Promise<FormattedResponse<APIForumTopic>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("forum_topics.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (!response.data || response.data.length == 0) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    // TODO get()

}

interface ForumTopicSearchParams extends SearchParams {
    // Derived
    id?: number | number[],
    /// title_matches?: string,
    is_sticky?: boolean,
    is_hidden?: boolean,
    category_id?: APIForumCategoryID,

    // Aliases
    title?: string,
}
