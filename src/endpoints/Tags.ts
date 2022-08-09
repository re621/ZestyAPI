import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { Validation } from "../components/Validation";
import { APITag, APITagCategory } from "../responses/APITag";

export class TagsEndpoint extends Endpoint {

    public Category = APITagCategory;

    /**
     * Fetches tag data based on provided parameters
     * @param {TagSearchParams} params Search parameters
     * @returns {FormattedResponse<APITag[]>} Tag data
     */
    public find(params: TagSearchParams): Promise<FormattedResponse<APITag[]>> {

        let query: TagSearchParams;
        try { query = this.validateFindParams(params); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("tags.json", { query: Endpoint.flattenSearchParams({ search: query }) })
            .then(
                (response: QueueResponse) => {
                    if (response.data.tags) {
                        // Yes, this is the inverse of what happens on other endpoints.
                        // The `tags` wrapper only appears if there are no results
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    /**
     * Fetch user data based on the exact ID or name.  
     * [b]Important:[/b] Due to a bug in E621's API, requests to this endpoint
     * may not return JSON if the tag does not exist. If you are not sure, use
     * `find()` instead, as it does not have that problem.
     * @param {string} tag Tag name
     * @returns {FormattedResponse<APITag>} Tag data
     */
    public get(tag: string): Promise<FormattedResponse<APITag>> {
        if (typeof tag == "object" || typeof tag == "undefined")
            return Endpoint.makeMalformedRequestResponse();

        return this.api.makeRequest(`tags/${tag}.json`)
            .then(
                (response: QueueResponse) => {
                    if (response.data == null) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = null;
                    } else return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    protected validateFindParams(params: TagSearchParams = {}): TagSearchParams {
        const result = super.validateFindParams(params) as TagSearchParams;

        if (params.name && (Array.isArray(params.name) || Validation.isString(params.name))) result.name = params.name;
        if (params.category && Validation.isInteger(params.category)) result.category = params.category;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

}

interface TagSearchParams extends SearchParams {
    name?: string | string[]
    category?: APITagCategory;
    order?: TagSearchOrder;
    // has_wiki?: YesNo;
    // has_artist?: YesNo; // TODO Implement YesNo
    // hide_empty?: OneZero;
}

enum TagSearchOrder {
    Newest = "date",
    Count = "count",
    Name = "name",
}