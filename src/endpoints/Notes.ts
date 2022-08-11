import Endpoint, { SearchParams } from "../components/Endpoint";
import { FormattedResponse } from "../components/RequestQueue";
import { APINote } from "../responses/APINote";

export default class NotesEndpoint extends Endpoint<APINote> {

    protected endpoint = "notes";
    protected searchParams = [
        "body_matches", "creator_name", "post_tags_match",  // Native
        "id", "creator_id", "post_id",                      // Derived
    ];
    protected searchParamAliases = {
        "body": "body_matches",
        "post_tags": "post_tags_match",
    };

    public find(search: NoteSearchParams = {}): Promise<FormattedResponse<APINote>> { return super.find(search); }
}

interface NoteSearchParams extends SearchParams {
    // Native
    /// body_matches?: string,
    /// creator_name?: string,
    post_tags_match?: string,

    // Derived
    id?: number | number[],
    creator_id?: number,
    post_id?: number | number[],

    // Aliases
    body?: string,
    post_tags?: string,
}