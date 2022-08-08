import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import E621 from "../E621";
import { APIUser } from "../responses/APIUser";

export default class UserEndpoint extends Endpoint {

    constructor(api: E621) {
        super(api);
    }

    /**
     * Fetches user data based on provided parameters
     * @param {UserSearchParams} params Search parameters
     * @returns {FormattedResponse<APIUser[]>} User data
     */
    public async find(params: UserSearchParams): Promise<FormattedResponse<APIUser[]>> {

        let query: UserSearchParams;
        try { query = this.validateFindParams(params); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("users.json", { query: Endpoint.flattenSearchParams({ search: query }, "+") })
            .then(
                (response: QueueResponse) => {
                    if (!response.data || response.data.length == 0) {
                        response.status.code = 404;
                        response.status.message = ResponseStatusMessage.NotFound;
                        response.data = [];
                    }
                    return Endpoint.formatAPIResponse(response.status, response.data);
                },
                (error: QueueResponse) => {
                    return Endpoint.formatAPIResponse(error.status, []);
                }
            );
    }

    /**
     * Fetch user data based on the exact ID or name
     * @param {number | string} id User ID or name
     * @returns {FormattedResponse<APIUser>} User data
     */
    public async get(id: string | number): Promise<FormattedResponse<APIUser>> {
        if (typeof id == "object" || typeof id == "undefined")
            return Endpoint.makeMalformedRequestResponse();

        return this.api.makeRequest(`users/${id}.json`).then(
            (response: QueueResponse) => Endpoint.formatAPIResponse(response.status, response.data),
            (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, null)
        );
    }

    public isAuthenticated(): Promise<boolean> {
        const auth = {
            username: "username",
        }
        /*
        TODO Fix this
        const auth = this.api.getAuthLogin();
        if (!auth || !auth.apiKey || !auth.username) return Promise.resolve(false);
        */

        return this.api.makeRequest(`users/${auth.username}.json`).then(
            (data) => {
                if (!data.name || data.success == false) return false;
                return typeof data.email !== "undefined";
            },
            (error) => { return false; }
        );
    }

    protected validateFindParams(params: UserSearchParams): UserSearchParams {
        const result = super.validateFindParams(params) as UserSearchParams;

        if (params.name_matches && typeof params.name_matches !== "object")
            result.name_matches = params.name_matches + "";
        if (params.email_matches && typeof params.email_matches !== "object")
            result.email_matches = params.email_matches + "";
        if (typeof params.level == "number")
            result.level = params.level;
        if (typeof params.min_level == "number")
            result.min_level = params.min_level;
        if (typeof params.max_level == "number")
            result.max_level = params.max_level;
        if (typeof params.can_upload_free == "boolean")
            result.can_upload_free = params.can_upload_free;
        if (typeof params.can_approve_posts == "boolean")
            result.can_approve_posts = params.can_approve_posts;
        if (params.order && typeof params.order == "string")
            result.order = params.order;

        return result;
    }

}

interface UserSearchParams extends SearchParams {
    name_matches?: string;
    email_matches?: string;
    level?: UserLevel;
    min_level?: UserLevel;
    max_level?: UserLevel;
    can_upload_free?: boolean; // TODO Make this YesNo
    can_approve_posts?: boolean;
    order?: UserSearchOrder;
}

export enum UserLevel {
    Anonymous = 0,
    Blocked = 10,
    Member = 20,
    Privileged = 30,
    Contributor = 33,
    FormerStaff = 34,
    Janitor = 35,
    Moderator = 40,
    Admin = 50,
}

export enum UserSearchOrder {
    Date = "date",
    Name = "name",
    PostUploadCount = "post_upload_count",
    NoteCount = "note_count",
    PostUpdateCount = "post_update_count",
}
