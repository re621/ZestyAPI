import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import Validation from "../components/Validation";
import E621 from "../E621";
import APIUser, { APIUserLevel } from "../responses/APIUser";

export default class UsersEndpoint extends Endpoint {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    public UserLevel = APIUserLevel;
    public SearchOrder = UserSearchOrder;

    constructor(api: E621) {
        super(api);
    }

    /**
     * Fetches user data based on provided parameters
     * @param {UserSearchParams} params Search parameters
     * @returns {FormattedResponse<APIUser[]>} User data
     */
    public async find(search: UserSearchParams = {}): Promise<FormattedResponse<APIUser[]>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(true); }

        return this.api.makeRequest("users.json", { query: Endpoint.flattenParams(lookup) })
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

    /**
     * Checks if the saved login credentials are correct or not.
     * Does not work with the AuthToken, since there is no username provided.
     * @returns {boolean} `true` if the user is logged in, `false` otherwise.
     */
    public async isAuthenticated(): Promise<boolean> {
        const auth = this.api.getAuthLogin();
        if (!auth) return Promise.resolve(false);

        return this.get(auth.username).then((response) => {
            return response.status.code == 200;
        });
    }

    protected validateSearchParams(params: UserSearchParams = {}): UserSearchParams {
        const result = super.validateSearchParams(params) as UserSearchParams;

        if (params.name_matches && !Validation.isObject(params.name_matches))
            result.name_matches = params.name_matches + "";
        if (params.email_matches && !Validation.isObject(params.email_matches))
            result.email_matches = params.email_matches + "";
        if (Array.isArray(params.level) || Validation.isInteger(params.level))
            result.level = params.level;
        if (Validation.isInteger(params.min_level))
            result.min_level = params.min_level;
        if (Validation.isInteger(params.max_level))
            result.max_level = params.max_level;
        if (Validation.isBoolean(result.can_upload_free))
            result.can_upload_free = params.can_upload_free;
        if (Validation.isBoolean(params.can_approve_posts))
            result.can_approve_posts = params.can_approve_posts;
        if (params.order && Validation.isString(params.order))
            result.order = params.order;

        return result;
    }

}

interface UserSearchParams extends SearchParams {
    name_matches?: string;
    email_matches?: string;
    level?: APIUserLevel | APIUserLevel[];
    min_level?: APIUserLevel;
    max_level?: APIUserLevel;
    can_upload_free?: boolean;
    can_approve_posts?: boolean;
    order?: UserSearchOrder;
}

export enum UserSearchOrder {
    Date = "date",
    Name = "name",
    PostUploadCount = "post_upload_count",
    NoteCount = "note_count",
    PostUpdateCount = "post_update_count",
}
