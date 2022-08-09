import { FormattedResponse } from "../components/RequestQueue";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint, { TagRelationshipSearchParams } from "./TagRelationships";

export default class TagImplicationsEndpoint extends TagRelationshipsEndpoint {

    public ImplicationStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_implications", params);
    }

}