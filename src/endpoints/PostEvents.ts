import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import APIPostEvent, { APIPostEventAction } from "../responses/APIPostEvent";

export default class PostEventsEndpoint extends Endpoint<APIPostEvent> {

    /*
    Endpoint Notes

    - Returns an empty object `{ post_events: [] }` when no results are found in a search

    */

    public PostEventAction = APIPostEventAction;

    public async find(search: PostEventSearchParams = {}): Promise<FormattedResponse<APIPostEvent[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("post_events.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.post_events || response.data.post_events.length == 0) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.post_events;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    protected validateSearchParams(params: PostEventSearchParams = {}): PostEventSearchParams {
        const results = super.validateSearchParams(params) as PostEventSearchParams;

        if (params.id && (Array.isArray(params.id) || Validation.isInteger(params.id))) results.id = params.id;
        if (params.post_id && Validation.isInteger(params.post_id)) results.post_id = params.post_id;
        if (params.creator_name && Validation.isString(params.creator_name)) results.creator_name = params.creator_name;
        if (params.creator_id && (Array.isArray(params.creator_id) || Validation.isInteger(params.creator_id))) results.creator_id = params.creator_id;
        if (params.action && Validation.isString(params.action)) results.action = params.action;

        return results;
    }

}

interface PostEventSearchParams extends SearchParams {
    id?: number | number[],
    post_id?: number,
    creator_name?: string,
    creator_id?: number | number[],
    action?: APIPostEventAction,
}