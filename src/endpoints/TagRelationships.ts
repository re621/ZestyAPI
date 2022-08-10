import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import { APITagCategory } from "../responses/APITag";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";

export default class TagRelationshipsEndpoint extends Endpoint<APITagAlias> {

    protected searchParams = [
        "name_matches", "antecedent_name", "consequent_name", "creator_name", "approver_name",
        "antecedent_tag_category", "consequent_tag_category", "status", "order",    // Native
    ];
    protected searchParamAliases = {
        "name": "name_matches",
    };
    public find(search: TagRelationshipSearchParams = {}): Promise<FormattedResponse<APITagAlias[]>> { return super.find(search); }

}

export interface TagRelationshipSearchParams extends SearchParams {
    // Native
    /// name_matches?: string,
    antecedent_name?: string,
    consequent_name?: string,
    creator_name?: string,
    approver_name?: string,
    antecedent_tag_category?: APITagCategory,
    consequent_tag_category?: APITagCategory,
    status?: APITagAliasStatus,
    order?: TagRelationshipSearchOrder,

    // Aliases
    name?: string,
}

enum TagRelationshipSearchOrder {
    Status = "status",
    CreatedAt = "created_at",
    UpdatedAt = "updated_at",
    Name = "name",
    TagCount = "tag_count",
}