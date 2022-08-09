import { FormattedResponse } from "../components/RequestQueue";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";
import TagRelationshipsEndpoint, { TagRelationshipSearchParams } from "./TagRelationships";

export default class TagAliasesEndpoint extends TagRelationshipsEndpoint {

    public AliasStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_aliases", params);
    }

}

