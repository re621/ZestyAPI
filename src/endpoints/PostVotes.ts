import Endpoint from "../components/Endpoint";
import { FormattedResponse, GenericResponse, QueueResponse } from "../components/RequestQueue";
import { MalformedRequestError } from "../error/RequestError";
import { ResponseCode, ResponseStatusMessage } from "../error/ResponseCode";
import APIPostVote, { VoteResponse } from "../responses/APIPostVote";

export default class PostVotes extends Endpoint<APIPostVote> {

    public async find(): Promise<FormattedResponse<APIPostVote>> {
        throw MalformedRequestError.NotImplemented();
    }

    public async vote(post_id: number, score: number, preventUnvote = false): Promise<GenericResponse<VoteResponse>> {

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

        return this.api.makeRequest(`posts/${post_id}/votes.json`, {
            method: "POST",
            body: {
                score: score,
                no_unvote: preventUnvote === true,
            }
        }).then(
            (response: QueueResponse) => {
                if (response.data.success === false) {
                    response.status.code = ResponseCode.NotFound;
                    response.status.message = ResponseStatusMessage.NotFound;
                    response.data = [];
                }
                return Endpoint.formatAPIResponse(response.status, [response.data]);
            },
            (error: QueueResponse) => {
                return Endpoint.formatAPIResponse(error.status, [])
            }
        );

    }

}
