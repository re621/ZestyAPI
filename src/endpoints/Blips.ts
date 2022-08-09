import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import { APIBlip } from "../responses/APIBlip";

export default class BlipsEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Returns an empty object `{ blips: [] }` when no results are found in a search

    */

    public async find(search: BlipSearchParams): Promise<FormattedResponse<APIBlip[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("blips.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (response.data.blips) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    protected validateSearchParams(params: BlipSearchParams = {}): BlipSearchParams {
        const results = super.validateSearchParams(params) as BlipSearchParams;

        if (params.creator_name && Validation.isString(params.creator_name)) results.creator_name = params.creator_name;
        if (params.body_matches && Validation.isString(params.body_matches)) results.body_matches = params.body_matches;
        if (params.response_to && Validation.isInteger(params.response_to)) results.response_to = params.response_to;
        if (params.order && Validation.isString(params.order)) results.order = params.order;

        return results;
    }

}

interface BlipSearchParams extends SearchParams {
    creator_name?: string,
    body_matches?: string,
    response_to?: number,
    order?: BlipSearchOrder,
}

enum BlipSearchOrder {
    Created = "id_desc",
    Updated = "updated_at_desc",
}