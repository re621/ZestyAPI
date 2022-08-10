import Endpoint from "../components/Endpoint";
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

}

interface NoteSearchParams {
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