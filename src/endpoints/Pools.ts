import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import APIPool, { APIPoolCategory } from "../responses/APIPool";

export default class PoolsEndpoint extends Endpoint<APIPool> {

    /*
    Endpoint Notes

    - Note that the parameters are different from PostSets
    - Unlike PostSets, returns an empty array `[]` instead of an empty object when no results are found

    */

    public PoolCategory = APIPoolCategory;

    /**
     * Fetches pool data based on provided parameters
     * @param {PoolSearchParams} search Search parameters
     * @returns {FormattedResponse<APIPool[]>} Tag data
     */
    public find(search: PoolSearchParams = {}): Promise<FormattedResponse<APIPool[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("pools.json", { query: Endpoint.flattenParams(lookup) })
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

    protected validateSearchParams(params: PoolSearchParams = {}): PoolSearchParams {
        const result = super.validateSearchParams(params) as PoolSearchParams;

        if (params.name_matches && Validation.isString(params.name_matches)) result.name_matches = params.name_matches;
        if (params.description_matches && Validation.isString(params.description_matches)) result.description_matches = params.description_matches;
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (Validation.isBoolean(params.is_active)) result.is_active = params.is_active;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

}

interface PoolSearchParams extends SearchParams {
    name_matches?: string,
    description_matches?: string,
    creator_name?: string,
    is_active?: boolean,
    order?: PoolSearchOrder,
}

enum PoolSearchOrder {
    UpdatedAt = "updated_at",
    CreatedAt = "created_at",
    Name = "name",
    PostCount = "post_count",
}