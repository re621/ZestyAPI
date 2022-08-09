import { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint from "./TagRelationships";

export default class TagAliasesEndpoint extends TagRelationshipsEndpoint {

    /*
    Endpoint Notes

    - Virtually identical to `tag_implications`
    - Returns an empty object `{ tag_aliases: [] }` when no results are found in a search

    */

    public AliasStatus = APITagAliasStatus;
    protected endpoint = "tag_aliases";

}

