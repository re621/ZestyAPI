import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import Validation from "../components/Validation";
import { APIForumPost } from "../responses/APIForumPost";
import { APIForumCategoryID } from "../responses/APIForumTopic";

export default class ForumPostsEndpoint extends Endpoint<APIForumPost> {

    /*
    Endpoint Notes

    - Returns an empty object `{ forum_posts: [] }` when no results are found in a search

    */

    public ForumCategory = APIForumCategoryID;
    protected endpoint = "forum_posts";
    public find(search: ForumPostSearchParams = {}): Promise<FormattedResponse<APIForumPost[]>> { return super.find(search); }

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