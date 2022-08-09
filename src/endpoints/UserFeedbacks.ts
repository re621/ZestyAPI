import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import Validation from "../components/Validation";
import APIUserFeedback, { APIFeedbackCategory } from "../responses/APIUserFeedback";

export default class UserFeedbacksEndpoint extends Endpoint<APIUserFeedback> {

    /*
    Endpoint Notes

    - Returns an empty object `{ user_feedbacks: [] }` when no results are found in a search

    */

    public FeedbackCategory = APIFeedbackCategory;
    protected endpoint = "user_feedbacks";
    public find(search: UserFeedbacksSearchParams = {}): Promise<FormattedResponse<APIUserFeedback[]>> { return super.find(search); }

    protected validateSearchParams(params: UserFeedbacksSearchParams = {}): UserFeedbacksSearchParams {
        const result = super.validateSearchParams(params) as UserFeedbacksSearchParams;

        if (params.id && (Array.isArray(params.id) || Validation.isInteger(params.id))) result.id = params.id;
        if (params.user_name && Validation.isString(params.user_name)) result.user_name = params.user_name;
        if (params.user_id && (Array.isArray(params.user_id) || Validation.isInteger(params.user_id))) result.user_id = params.user_id;
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.creator_id && (Array.isArray(params.creator_id) || Validation.isInteger(params.creator_id))) result.creator_id = params.creator_id;
        if (params.body_matches && Validation.isString(params.body_matches)) result.body_matches = params.body_matches;
        if (params.category && Validation.isString(params.category)) result.category = params.category;

        return result;
    }
}

interface UserFeedbacksSearchParams extends SearchParams {
    id?: number | number[];
    user_name?: string,
    user_id?: number,
    creator_name?: string,
    creator_id?: number,
    body_matches?: string,
    category?: APIFeedbackCategory,
}