import Endpoint, { QueryParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import { APIIQDBResponse } from "../responses/APIIQDBResponse";

export default class IQDBQueriesEndpoint extends Endpoint<APIIQDBResponse> {

    public async find(query: IQDBQueryParams = {}): Promise<FormattedResponse<APIIQDBResponse[]>> {

        let lookup: PrimitiveMap;
        try { lookup = this.validateParams({}, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("iqdb_queries.json", { query: Endpoint.flattenParams(lookup), rateLimit: 2000 })
            .then(
                (response: QueueResponse) => {
                    if (response.data.posts) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    protected validateQueryParams(params?: IQDBQueryParams): IQDBQueryParams {
        const result: IQDBQueryParams = {};

        if (typeof params.url !== "undefined") result.url = params.url;
        if (typeof params.post_id !== "undefined") result.post_id = params.post_id;

        return result;
    }

}

interface IQDBQueryParams extends QueryParams {
    url?: string;
    post_id?: number;
}