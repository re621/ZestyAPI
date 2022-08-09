import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import { APIWikiPage } from "../responses/APIWikiPage";

export default class WikiPagesEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    public async find(search: WikiPageSearchParams = {}): Promise<FormattedResponse<APIWikiPage[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("wiki_pages.json", { query: Endpoint.flattenParams(lookup) })
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

    protected validateSearchParams(params: WikiPageSearchParams = {}): WikiPageSearchParams {
        const results = super.validateSearchParams(params);

        if (params.title && Validation.isString(params.title)) results.title = params.title;
        if (params.body_matches && Validation.isString(params.body_matches)) results.body_matches = params.body_matches;
        if (params.creator_name && Validation.isString(params.creator_name)) results.creator_name = params.creator_name;
        if (params.other_names_match && Validation.isString(params.other_names_match)) results.other_names_match = params.other_names_match;

        return results;
    }
}

interface WikiPageSearchParams extends SearchParams {
    title?: string,
    body_matches?: string,
    creator_name?: string,
    other_names_match?: string,
    // other_names_present?: YesNo,
    // hide_deleted?: YesNo,
    order?: WikiPageSearchOrder,
}

enum WikiPageSearchOrder {
    Name = "title",
    Date = "time",
    Posts = "post_count",
}