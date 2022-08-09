import { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint from "./TagRelationships";

export default class TagImplicationsEndpoint extends TagRelationshipsEndpoint {

    /*
    Endpoint Notes

    - Virtually identical to `tag_aliases`
    - Returns an empty object `{ tag_implications: [] }` when no results are found in a search

    */

    public ImplicationStatus = APITagAliasStatus;
    protected endpoint = "tag_implications";

}