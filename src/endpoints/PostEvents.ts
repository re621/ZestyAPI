import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/UtilType";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPostEvent, { APIPostEventAction } from "../responses/APIPostEvent";

export default class PostEventsEndpoint extends Endpoint<APIPostEvent> {

    /*
    Endpoint Notes

    - Returns an empty object `{ post_events: [] }` when no results are found in a search

    */

    public Action = APIPostEventAction;
    protected searchParams = [
        "post_id", "creator_name", "action",    // Native
        "id", "creator_id",                     // Derived
    ]

    public async find(search: PostEventSearchParams = {}): Promise<FormattedResponse<APIPostEvent>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("post_events.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.post_events || response.data.post_events.length == 0) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.post_events;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

}

interface PostEventSearchParams extends SearchParams {
    // Native
    post_id?: number,
    creator_name?: string,
    action?: APIPostEventAction,

    // Derived
    id?: number | number[],
    creator_id?: number | number[],
}
