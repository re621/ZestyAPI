import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import APIUserFeedback, { APIFeedbackCategory } from "../responses/APIUserFeedback";

export default class UserFeedbacksEndpoint extends Endpoint<APIUserFeedback> {

    /*
    Endpoint Notes

    - Returns an empty object `{ user_feedbacks: [] }` when no results are found in a search

    */

    public FeedbackCategory = APIFeedbackCategory;
    protected endpoint = "user_feedbacks";
    protected searchParams = [
        "user_name", "creator_name", "body_matches", "category",    // Native
        "id", "user_id", "creator_id",                              // Derived
    ];
    protected searchParamAliases = {
        "body": "body_matches",
    };
    public find(search: UserFeedbacksSearchParams = {}): Promise<FormattedResponse<APIUserFeedback>> { return super.find(search); }

}

interface UserFeedbacksSearchParams extends SearchParams {
    // Native
    user_name?: string,
    creator_name?: string,
    /// body_matches?: string,
    category?: APIFeedbackCategory,

    // Derived
    id?: number | number[];
    user_id?: number,
    creator_id?: number,

    // Aliases
    body?: string,
}