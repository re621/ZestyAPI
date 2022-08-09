import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import Util from "../components/Util";
import { MalformedRequestError } from "../error/RequestError";
import { APIPost } from "../responses/APIPost";

export default class PostEndpoint extends Endpoint {

    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 40 tags.  
     * If the page limit and post number need to be specified, use the other overload.
     * @param {string | string[]} tags List of tags to search for
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async find(tags?: string | string[]): Promise<FormattedResponse<APIPost[]>>
    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 40 tags.  
     * Page number and post limit can be specified as parameters.
     * @param {PostSearchParams} params Search parameters
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async find(params: PostSearchParams): Promise<FormattedResponse<APIPost[]>>
    public async find(params: string | string[] | PostSearchParams): Promise<FormattedResponse<APIPost[]>> {
        if (typeof params == "undefined") return this.find({});
        else if (typeof params == "string") return this.find({ tags: params.trim().split(" ").filter(n => n) });
        else if (Array.isArray(params)) return this.find({ tags: params });

        let query: PostSearchParams;
        try { query = this.validateFindParams(params); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        if (query.tags) query.tags = Util.encodeArray(query.tags);
        return this.api.makeRequest("posts.json", { query: Endpoint.flattenSearchParams(query, "+") })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.posts || response.data.posts.length == 0) {
                        response.status.code = 404;
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
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.post;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, null);
                }
            );
    }

    /**
     * Fetches data for multiple posts by their IDs.  
     * Note that up to 100 IDs are accepted at a time. Everything past that will be discarded.
     * @param ids List of post IDs
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async getMany(ids: number[]): Promise<FormattedResponse<APIPost[]>> {
        if (!Array.isArray(ids))
            return Endpoint.makeMalformedRequestResponse();
        return this.find("id:" + ids.join(","));
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
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.post;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, null);
                }
            )
    }

    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 39 tags.  
     * If the page limit and post number need to be specified, use the other overload.
     * @param {string | string[]} tags List of tags to search for
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async randomMany(tags?: string | string[]): Promise<FormattedResponse<APIPost[]>>
    /**
     * Search for posts with specified tags.  
     * Note that the hard limit for this request is 39 tags.  
     * Page number and post limit can be specified as parameters.
     * @param {PostSearchParams} params Search parameters
     * @returns {FormattedResponse<APIPost[]>} Post data
     */
    public async randomMany(params: PostSearchParams): Promise<FormattedResponse<APIPost[]>>
    public async randomMany(params: string | string[] | PostSearchParams): Promise<FormattedResponse<APIPost[]>> {
        if (typeof params == "undefined") return this.find({});
        else if (typeof params == "string") return this.find({ tags: params.trim().split(" ").filter(n => n) });
        else if (Array.isArray(params)) return this.find({ tags: params });

        let query: PostSearchParams;
        try { query = this.validateFindParams(params); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        if (!query.tags) query.tags = [];
        query.tags.push("order:random");
        query.tags = Util.encodeArray(query.tags);

        return this.api.makeRequest("posts.json", { query: Endpoint.flattenSearchParams(query, "+") })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.posts || response.data.posts.length == 0) {
                        response.status.code = 404;
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

    protected validateFindParams(params: PostSearchParams = {}): PostSearchParams {
        const result = super.validateFindParams(params) as PostSearchParams;

        if (!params.tags) result.tags = [];
        else if (typeof params.tags !== "object") result.tags = [params.tags + ""];
        else if (Array.isArray(params.tags)) result.tags = params.tags;
        else throw MalformedRequestError.Params();

        return result as PostSearchParams;
    }
}

interface PostSearchParams extends SearchParams {
    tags?: string[]
}