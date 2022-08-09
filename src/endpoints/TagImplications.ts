import { FormattedResponse } from "../components/RequestQueue";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint, { TagRelationshipSearchParams } from "./TagRelationships";

export default class TagImplicationsEndpoint extends TagRelationshipsEndpoint {

    /*
    Endpoint Notes

    - Virtually identical to `tag_aliases`
    - Returns an empty object `{ tag_implications: [] }` when no results are found in a search

    */

    public ImplicationStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams = {}): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_implications", params);
    }

}