import Endpoint from "../components/Endpoint";
import { FormattedResponse, QueueResponse } from "../components/RequestQueue";
import { MalformedRequestError } from "../error/RequestError";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPost from "../responses/APIPost";

export default class Favorites extends Endpoint<APIPost> {

    protected endpoint = "favorites.json";

    public async find(): Promise<FormattedResponse<APIPost>> {
        throw MalformedRequestError.NotImplemented();
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

}
