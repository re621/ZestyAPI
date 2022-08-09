import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import { APIForumPost } from "../responses/APIForumPost";
import { APIForumCategoryID } from "../responses/APIForumTopic";

export default class ForumPostsEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Returns an empty object `{ forum_posts: [] }` when no results are found in a search

    */

    public ForumCategory = APIForumCategoryID;

    public async find(search: ForumPostSearchParams = {}): Promise<FormattedResponse<APIForumPost[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("forum_posts.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (response.data.forum_posts) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    protected validateSearchParams(params: ForumPostSearchParams = {}): ForumPostSearchParams {
        const results = super.validateSearchParams(params) as ForumPostSearchParams;

        if (params.topic_title_matches && Validation.isString(params.topic_title_matches)) results.topic_title_matches = params.topic_title_matches;
        if (params.body_matches && Validation.isString(params.body_matches)) results.body_matches = params.body_matches;
        if (params.creator_name && Validation.isString(params.creator_name)) results.creator_name = params.creator_name;
        if (params.topic_category_id && Validation.isInteger(params.topic_category_id)) results.topic_category_id = params.topic_category_id;

        return results;
    }

}

interface ForumPostSearchParams extends SearchParams {
    topic_title_matches?: string,
    body_matches?: string,
    creator_name?: string,
    topic_category_id?: APIForumCategoryID,
}