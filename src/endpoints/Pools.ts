import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPool, { APIPoolCategory } from "../responses/APIPool";

export default class PoolsEndpoint extends Endpoint<APIPool> {

    /*
    Endpoint Notes

    - Note that the parameters are different from PostSets
    - Unlike PostSets, returns an empty array `[]` instead of an empty object when no results are found

    */

    public Category = APIPoolCategory;
    protected searchParams = [
        "name_matches", "description_matches", "creator_name", "is_active", "order",    // Native
        "id", "creator_id", "category",                                                 // Derived
    ];
    protected searchParamAliases = {
        "name": "name_matches",
        "description": "description_matches",
    };

    /**
     * Fetches pool data based on provided parameters
     * @param {PoolSearchParams} search Search parameters
     * @returns {FormattedResponse<APIPool[]>} Tag data
     */
    public find(search: PoolSearchParams = {}): Promise<FormattedResponse<APIPool>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("pools.json", { query: Endpoint.flattenParams(lookup) })
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

interface PoolSearchParams extends SearchParams {
    // Native
    /// name_matches?: string,
    /// description_matches?: string,
    creator_name?: string,
    is_active?: boolean,
    order?: PoolSearchOrder,

    // Derived
    id?: number,
    creator_id?: number,
    category?: APIPoolCategory,

    // Aliases
    name?: string,
    description?: string,
}

enum PoolSearchOrder {
    UpdatedAt = "updated_at",
    CreatedAt = "created_at",
    Name = "name",
    PostCount = "post_count",
}
