import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import Validation from "../components/Validation";
import APIPostSet from "../responses/APIPostSet";

export default class PostSetsEndpoint extends Endpoint<APIPostSet> {

    /*
    Endpoint Notes

    - Note that the parameters are different from Pools
    - Non-standard order parameter values: `postcount` and `update` instead of `post_count` and `updated_at`
    - Unlike Pools, returns an empty object `{ post_sets: [] }` when no results are found

    */

    protected endpoint = "post_sets";
    public find(search: PostSetSearchParams = {}): Promise<FormattedResponse<APIPostSet[]>> { return super.find(search); }

    // TODO get()

    protected validateSearchParams(params: PostSetSearchParams = {}): PostSetSearchParams {
        const result = super.validateSearchParams(params) as PostSetSearchParams;

        if (params.name && Validation.isString(params.name)) result.name = params.name;
        if (params.shortname && Validation.isString(params.shortname)) result.shortname = params.shortname;
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

}

interface PostSetSearchParams extends SearchParams {
    name?: string,
    shortname?: string,
    creator_name?: string,
    order?: PostSetSearchOrder,
}

enum PostSetSearchOrder {
    Name = "name",
    ShortName = "shortname",
    PostCount = "postcount",
    CreatedAt = "created_at",
    UpdatedAt = "update",
}