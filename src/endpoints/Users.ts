import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse, QueueResponse, ResponseStatusMessage } from "../components/RequestQueue";
import { PrimitiveMap } from "../components/Util";
import APIUser, { APIUserLevel } from "../responses/APIUser";

export default class UsersEndpoint extends Endpoint<APIUser> {

    /*
    Endpoint Notes

    - Returns an empty array `[]` instead of an empty object when no results are found

    */

    public Level = APIUserLevel;
    public SearchOrder = UserSearchOrder;
    protected searchParams = [
        "name_matches", "email_matches", "level", "min_level", "max_level",
        "can_upload_free", "can_approve_posts", "order",    // Native
    ];
    protected searchParamAliases = {
        "name": "name_matches",
        "email": "email_matches",
    }

    /**
     * Fetches user data based on provided parameters
     * @param {UserSearchParams} params Search parameters
     * @returns {FormattedResponse<APIUser[]>} User data
     */
    public async find(search: UserSearchParams = {}): Promise<FormattedResponse<APIUser>> {

        const query = this.splitQueryParams(search);
        let lookup: PrimitiveMap;
        try { lookup = this.validateParams(search, query); }
        catch (e) { return Endpoint.makeMalformedRequestResponse(); }

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
            (error: QueueResponse) => Endpoint.formatAPIResponse(error.status, [])
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

}

interface UserSearchParams extends SearchParams {
    // Native
    /// name_matches?: string;
    /// email_matches?: string;
    level?: APIUserLevel | APIUserLevel[];
    min_level?: APIUserLevel;
    max_level?: APIUserLevel;
    can_upload_free?: boolean;
    can_approve_posts?: boolean;
    order?: UserSearchOrder;

    // Alias
    name?: string;
    email?: string;
}

export enum UserSearchOrder {
    Date = "date",
    Name = "name",
    PostUploadCount = "post_upload_count",
    NoteCount = "note_count",
    PostUpdateCount = "post_update_count",
}
