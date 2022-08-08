import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import Util from "../components/Util";
import { MalformedRequestError } from "../error/RequestError";
import { APITag } from "../responses/APITag";

export class TagsEndpoint extends Endpoint {

    public find(tags: string | string[]): Promise<FormattedResponse<APITag>> { // TODO Proper response
        if (typeof tags == "string")
            tags = tags.trim().split(" ").filter(n => n);
        else if (tags == null || typeof tags == "undefined") return Endpoint.makeMalformedRequestResponse(true);
        else if (typeof tags !== "object") tags = [tags + ""];
        else if (!Array.isArray(tags)) return Endpoint.makeMalformedRequestResponse(true); // TODO Standardize error output

        // Handle the fucked-up way the site returns 0 results
        return this.api.makeRequest("tags.json", { query: { "search[name]": Util.encodeArray(tags).join(",") } })
            .then(
                (response: QueueResponse) => {
                    if (response.data.tags) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else
                        return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    public get(tag: string): Promise<FormattedResponse<APITag>> {
        if (typeof tag != "string") return Promise.resolve(null); // TODO Standardize error output

        return this.api.makeRequest(`tags/${tag}.json`)
            .then(
                (response: QueueResponse) => {
                    if (response.data == null) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = null;
                    } else
                        return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    protected validateFindParams(params: SearchParams, tags: string | string[]): TagSearchParams {
        const result = super.validateFindParams(params) as TagSearchParams;

        if (!tags) result.name = [];
        else if (typeof tags == "string") result.name = tags.trim().split(" ").filter(n => n);
        else if (typeof tags !== "object") result.name = [tags + ""];
        else if (Array.isArray(tags)) result.name = tags;
        else throw MalformedRequestError.Params();

        return result;
    }

}

interface TagSearchParams extends SearchParams {
    name?: string[]
}