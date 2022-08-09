import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import APIPostSet from "../responses/APIPostSet";

export default class PostSetsEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Note that the parameters are different from Pools
    - Non-standard order parameter values: `postcount` and `update` instead of `post_count` and `updated_at`
    - Unlike Pools, returns an empty object `{ post_sets: [] }` when no results are found

    */

    /**
     * Fetches pool data based on provided parameters
     * @param {PoolSearchParams} search Search parameters
     * @returns {FormattedResponse<APIPostSet[]>} Tag data
     */
    public find(search: PostSetSearchParams = {}): Promise<FormattedResponse<APIPostSet[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("post_sets.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (response.data.post_sets) {
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

    protected validateSearchParams(params: PostSetSearchParams = {}): PostSetSearchParams {
        const result = super.validateSearchParams(params) as PostSetSearchParams;

        if (params.name && Validation.isString(params.name)) result.name = params.name;
        if (params.shortname && Validation.isString(params.shortname)) result.shortname = params.shortname;
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

}

interface PostSetSearchParams extends SearchParams {
    name?: string,
    shortname?: string,
    creator_name?: string,
    order?: PostSetSearchOrder,
}

enum PostSetSearchOrder {
    Name = "name",
    ShortName = "shortname",
    PostCount = "postcount",
    CreatedAt = "created_at",
    UpdatedAt = "update",
}