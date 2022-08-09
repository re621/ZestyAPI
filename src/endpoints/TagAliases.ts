import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { Validation } from "../components/Validation";
import { APITagCategory } from "../responses/APITag";
import { APITagAlias, APITagAliasStatus } from "../responses/APITagAlias";

class TagRelationshipsEndpoint extends Endpoint {

    public commonFind(endpoint: "tag_aliases" | "tag_implications", params: TagRelationshipSearchParams): Promise<FormattedResponse<APITagAlias[]>> {

        let query: TagRelationshipSearchParams;
        try { query = this.validateFindParams(params); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest(endpoint + ".json", { query: Endpoint.flattenSearchParams({ search: query }) })
            .then(
                (response: QueueResponse) => {
                    if (response.data[endpoint]) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
            );
    }

    protected validateFindParams(params: TagRelationshipSearchParams): TagRelationshipSearchParams {
        const result = super.validateFindParams(params) as TagRelationshipSearchParams;

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

export class TagAliasesEndpoint extends TagRelationshipsEndpoint {

    public AliasStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_aliases", params);
    }

}

export class TagImplicationsEndpoint extends TagRelationshipsEndpoint {

    public ImplicationStatus = APITagAliasStatus;

    public find(params: TagRelationshipSearchParams): Promise<FormattedResponse<APITagAlias[]>> {
        return super.commonFind("tag_implications", params);
    }

}

interface TagRelationshipSearchParams extends SearchParams {
    name_matches: string,
    antecedent_name: string,
    consequent_name: string,
    creator_name: string,
    approver_name: string,
    antecedent_tag_category: APITagCategory,
    consequent_tag_category: APITagCategory,
    status: APITagAliasStatus,
    order: TagRelationshipSearchOrder,
}

enum TagRelationshipSearchOrder {
    Status = "status",
    CreatedAt = "created_at",
    UpdatedAt = "updated_at",
    Name = "name",
    TagCount = "tag_count",
}