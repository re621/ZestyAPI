import Endpoint, { QueryParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import Util from "../components/Util";
import { PrimitiveMap, SimpleMap } from "../components/UtilType";
import { MalformedRequestError } from "../error/RequestError";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPost from "../responses/APIPost";

export default class PostsEndpoint extends Endpoint<APIPost> {

    /*
    Endpoint Notes

    - No search parameters, everything is in query parameters
    - Output is wrapped in `{ posts: [] }` when searching for multiple posts (ex. `/posts.json`)
    - Output is wrapped in `{ post: {} }` when searching for one post (ex. `/posts/12345.json`)
    - Returns an empty object `{ posts: [] }` when no results are found in a search

    */

    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 40 tags.  
     * Page number and post limit can be specified as parameters.
     * @param {PostSearchParams} params Search parameters
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async find(query: PostQueryParams = {}): Promise<FormattedResponse<APIPost>> {

        let lookup: PrimitiveMap;
        try { lookup = this.validateParams({}, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("posts.json", { query: Endpoint.flattenParams(lookup, "+") })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.posts || response.data.posts.length == 0) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.posts;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    /**
     * Fetch post data for a specific post
     * @param {number} id ID of the post to return
     * @returns {FormattedResponse<APIPost>} Post data
     */
    public async get(id: number): Promise<FormattedResponse<APIPost>> {
        if (typeof id !== "number")
            return Endpoint.makeMalformedRequestResponse();

        return this.api.makeRequest(`posts/${id}.json`)
            .then(
                (response: QueueResponse) => {
                    if (!response.data.post) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = [response.data.post];
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    /**
     * Fetches data for multiple posts by their IDs.  
     * Note that up to 100 IDs are accepted at a time. Everything past that will be discarded.
     * @param ids List of post IDs
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async getMany(ids: number[]): Promise<FormattedResponse<APIPost>> {
        if (!Array.isArray(ids))
            return Endpoint.makeMalformedRequestResponse();
        return this.find({ tags: "id:" + ids.join(",") });
    }

    /**
     * Fetches data for a random post
     * @returns {FormattedResponse<APIPost>}Post data
     */
    public async random(): Promise<FormattedResponse<APIPost>> {
        return this.api.makeRequest(`posts/random.json`)
            .then(
                (response: QueueResponse) => {
                    if (!response.data.post) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = [response.data.post];
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            )
    }

    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 39 tags.  
     * Page number and post limit can be specified as parameters.
     * @param {PostQueryParams} query Search parameters
     * @param {string} seed Random seed. Optional.
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async randomMany(query: PostQueryParams = {}, seed?: string): Promise<FormattedResponse<APIPost>> {

        if (query.tags) {
            if (!Array.isArray(query.tags)) query.tags = query.tags.trim().split(" ").filter(n => n);
        } else query.tags = [];

        query.tags.push("order:random");
        if (seed) query.tags.push("randseed:" + seed);

        return this.find(query);
    }

    public async update(id: number, data: PostUpdateParams): Promise<FormattedResponse<APIPost>> {

        if (!this.api.isAuthSet) {
            return Endpoint.formatAPIResponse(
                {
                    code: ResponseCode.Unauthorized,
                    message: ResponseStatusMessage.Unauthorized,
                    url: null,
                },
                []
            )
        }

        return this.api.makeRequest(`posts/${id}.json`, {
            method: "PATCH",
            body: Util.Type.prefix("post", data),
        }).then(
            (response: QueueResponse) => {
                if (!response.data.post) {
                    response.status.code = ResponseCode.NotFound;
                    response.status.message = ResponseStatusMessage.NotFound;
                    response.data = [];
                } else response.data = [response.data.post];
                return Endpoint.formatAPIResponse(response.status, response.data);
            },
            (error: QueueResponse) => {
                return Endpoint.formatAPIResponse(error.status, []);
            }
        );
    }

    protected validateQueryParams(params: PostQueryParams = {}): PostQueryParams {
        const result = super.validateQueryParams(params) as PostQueryParams;

        if (!params.tags) result.tags = [];
        else if (typeof params.tags !== "object") result.tags = (params.tags + "").trim().split(" ").filter(n => n);
        else if (Array.isArray(params.tags)) result.tags = params.tags;
        else throw MalformedRequestError.Params();

        if (result.tags.length > 40) throw MalformedRequestError.TooMany("tags");

        return result as PostQueryParams;
    }
}

interface PostQueryParams extends QueryParams {
    tags?: string | string[]
}

interface PostUpdateParams extends SimpleMap {
    tag_string?: string,
    old_tag_string?: string,
    tag_string_diff?: string,

    rating?: "e" | "q" | "s",
    old_rating?: "e" | "q" | "s",

    parent_id?: number,
    old_parent_id?: number,

    source?: string,
    old_source?: string,
    source_diff?: string,

    description?: string,
    old_description?: string,

    edit_reason?: string,

    // Privileged+
    is_rating_locked?: boolean,

    // Janitor+
    is_note_locked?: boolean,
    bg_color?: string,

    // Admin
    is_status_locked?: boolean,
    is_comment_disabled?: boolean,
    locked_tags?: string,
    hide_from_anonymous?: boolean,
    hide_from_search_engines?: boolean,
}
