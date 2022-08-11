import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { APITag, APITagCategory } from "../responses/APITag";

export default class TagsEndpoint extends Endpoint<APITag> {

    /*
    Endpoint Notes

    - Returns an empty object `{ tags: [] }` when no results are found in a search

    */

    public Category = APITagCategory;
    protected endpoint = "tags";
    protected searchParams = [
        "name", "category", "order", "has_wiki", "has_artist", "hide_empty",    // Native
    ];
    public find(search: TagSearchParams = {}): Promise<FormattedResponse<APITag>> { return super.find(search); }

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
                (response: QueueResponse) => Endpoint.formatAPIResponse(response.status, response.data),
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

}

interface TagSearchParams extends SearchParams {
    // Native
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