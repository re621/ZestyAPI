import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import Validation from "../components/Validation";
import { APITagCategory } from "../responses/APITag";
import APITagAlias, { APITagAliasStatus } from "../responses/APITagAlias";

export default class TagRelationshipsEndpoint extends Endpoint<APITagAlias> {

    public find(search: TagRelationshipSearchParams = {}): Promise<FormattedResponse<APITagAlias[]>> { return super.find(search); }

    protected validateSearchParams(params: TagRelationshipSearchParams): TagRelationshipSearchParams {
        const result = super.validateSearchParams(params) as TagRelationshipSearchParams;

        if (params.name_matches && Validation.isString(params.name_matches)) result.name_matches = params.name_matches;
        if (params.antecedent_name && Validation.isString(params.antecedent_name)) result.antecedent_name = params.antecedent_name;
        if (params.consequent_name && Validation.isString(params.consequent_name)) result.name_matches = params.consequent_name;
        if (params.creator_name && Validation.isString(params.creator_name)) result.creator_name = params.creator_name;
        if (params.approver_name && Validation.isString(params.approver_name)) result.approver_name = params.approver_name;

        if (params.antecedent_tag_category && Validation.isInteger(params.antecedent_tag_category)) result.antecedent_tag_category = params.antecedent_tag_category;
        if (params.consequent_tag_category && Validation.isInteger(params.consequent_tag_category)) result.consequent_tag_category = params.consequent_tag_category;

        if (params.status && Validation.isString(params.status)) result.status = params.status;
        if (params.order && Validation.isString(params.order)) result.order = params.order;

        return result;
    }

}

export interface TagRelationshipSearchParams extends SearchParams {
    name_matches?: string,
    antecedent_name?: string,
    consequent_name?: string,
    creator_name?: string,
    approver_name?: string,
    antecedent_tag_category?: APITagCategory,
    consequent_tag_category?: APITagCategory,
    status?: APITagAliasStatus,
    order?: TagRelationshipSearchOrder,
}

enum TagRelationshipSearchOrder {
    Status = "status",
    CreatedAt = "created_at",
    UpdatedAt = "updated_at",
    Name = "name",
    TagCount = "tag_count",
}