import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import { APIForumPost } from "../responses/APIForumPost";
import { APIForumCategoryID } from "../responses/APIForumTopic";

export default class ForumPostsEndpoint extends Endpoint<APIForumPost> {

    /*
    Endpoint Notes

    - Returns an empty object `{ forum_posts: [] }` when no results are found in a search

    */

    public Category = APIForumCategoryID;
    protected endpoint = "forum_posts";
    protected searchParams = [
        "topic_title_matches", "body_matches", "creator_name", "topic_category_id", // Native
        "id", "creator_id", "topic_id", "is_hidden"                                 // Derived
    ];
    protected searchParamAliases = {
        "title": "topic_title_matches",
        "body": "body_matches",
    }
    public find(search: ForumPostSearchParams = {}): Promise<FormattedResponse<APIForumPost>> { return super.find(search); }

}

interface ForumPostSearchParams extends SearchParams {
    // Native
    /// topic_title_matches?: string,
    /// body_matches?: string,
    creator_name?: string,
    topic_category_id?: APIForumCategoryID,

    // Derived
    id?: number;
    creator_id?: number;
    topic_id?: number;
    is_hidden?: boolean;

    // Aliases
    title?: string,
    body?: string,
}