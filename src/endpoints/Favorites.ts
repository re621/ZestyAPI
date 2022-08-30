import Endpoint, { QueryParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/UtilType";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPost from "../responses/APIPost";

export default class Favorites extends Endpoint<APIPost> {

    protected endpoint = "favorites.json";

    public async find(query?: FavoritesQueryParams): Promise<FormattedResponse<APIPost>> {

        let lookup: PrimitiveMap;
        try { lookup = this.validateParams({}, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

        return this.api.makeRequest("favorites.json", { query: Endpoint.flattenParams(lookup) })
            .then(
                (response: QueueResponse) => {
                    if (!response.data.posts || response.data.posts.length == 0) {
                        response.status.code = ResponseCode.NotFound;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    } else response.data = response.data.posts;
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    public async add(post_id: number) {

        if (!this.api.isAuthSet) {
            return Endpoint.formatAPIResponse(
                {
                    code: ResponseCode.Unauthorized,
                    message: ResponseStatusMessage.Unauthorized,
                    url: null,
                },
                []
            )
        }

        return this.api.makeRequest(this.endpoint, {
            method: "POST",
            body: {
                post_id: post_id,
            },
        }).then(
            (response: QueueResponse) => {
                return Endpoint.formatAPIResponse(response.status, [])
            },
            (error: QueueResponse) => {
                return Endpoint.formatAPIResponse(error.status, [])
            }
        );
    }

    public async remove(post_id: number) {

        if (!this.api.isAuthSet) {
            return Endpoint.formatAPIResponse(
                {
                    code: ResponseCode.Unauthorized,
                    message: ResponseStatusMessage.Unauthorized,
                    url: null,
                },
                []
            )
        }

        return this.api.makeRequest(`favorites/${post_id}.json`, {
            method: "DELETE",
        }).then(
            (response: QueueResponse) => {
                return Endpoint.formatAPIResponse(response.status, [])
            },
            (error: QueueResponse) => {
                return Endpoint.formatAPIResponse(error.status, [])
            }
        );
    }

    protected validateQueryParams(params: FavoritesQueryParams = {}): FavoritesQueryParams {
        const result = super.validateQueryParams(params) as FavoritesQueryParams;

        if (params.user_id) {
            const userID = typeof params.user_id == "string"
                ? (params.user_id as string).split(",")[0]
                : params.user_id;
            if (typeof userID !== "number") params.user_id = parseInt(userID);

            if (params.user_id) result.user_id = params.user_id;
            else delete params.user_id;
        }

        return result as FavoritesQueryParams;
    }

}

interface FavoritesQueryParams extends QueryParams {
    user_id?: number,
}
