import { FormattedResponse } from "../components/RequestQueue";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint, { TagRelationshipSearchParams } from "./TagRelationships";

export default class TagAliasesEndpoint extends TagRelationshipsEndpoint {

    /*
    Endpoint Notes

    - Virtually identical to `tag_implications`
    - Returns an empty object `{ tag_aliases: [] }` when no results are found in a search

    */

    public AliasStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams = {}): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_aliases", params);
    }

}

