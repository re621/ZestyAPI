import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/UtilType";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import { APIWikiPage } from "../responses/APIWikiPage";

export default class WikiPagesEndpoint extends Endpoint<APIWikiPage> {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    protected searchParams = [
        "title", "body_matches", "creator_name", "other_names_match", "order",  // Native
    ];
    protected searchParamAliases = {
        "body": "body_matches",
    };

    public async find(search: WikiPageSearchParams = {}): Promise<FormattedResponse<APIWikiPage>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("wiki_pages.json", { query: Endpoint.flattenParams(lookup) })
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

}

interface WikiPageSearchParams extends SearchParams {
    // Native
    title?: string,
    /// body_matches?: string,
    creator_name?: string,
    other_names_match?: string,
    // other_names_present?: YesNo, // TODO
    // hide_deleted?: YesNo,
    order?: WikiPageSearchOrder,

    // Aliases
    body?: string,
}

enum WikiPageSearchOrder {
    Name = "title",
    Date = "time",
    Posts = "post_count",
}
