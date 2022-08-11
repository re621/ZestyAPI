import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import APIPostSet from "../responses/APIPostSet";

export default class PostSetsEndpoint extends Endpoint<APIPostSet> {

    /*
    Endpoint Notes

    - Note that the parameters are different from Pools
    - Non-standard order parameter values: `postcount` and `update` instead of `post_count` and `updated_at`
    - Unlike Pools, returns an empty object `{ post_sets: [] }` when no results are found

    */

    protected endpoint = "post_sets";
    protected searchParams = [
        "name", "shortname", "creator_name", "order", "is_public",  // Native
        "id",                                                       // Derived
    ];
    public find(search: PostSetSearchParams = {}): Promise<FormattedResponse<APIPostSet>> { return super.find(search); }

    // TODO get()

}

interface PostSetSearchParams extends SearchParams {
    // Native
    name?: string,
    shortname?: string,
    creator_name?: string,
    order?: PostSetSearchOrder,
    is_public?: boolean,

    // Derived
    id?: number,
}

enum PostSetSearchOrder {
    Name = "name",
    ShortName = "shortname",
    PostCount = "postcount",
    CreatedAt = "created_at",
    UpdatedAt = "update",
}