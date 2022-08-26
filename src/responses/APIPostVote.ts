import APIResponse from "./APIResponse";

// Approximate structure. Not actually available through the API.
export default interface APIPostVote extends APIResponse {
    id: number,
    post_id: number,
    user_id: number,
    score: number,
    created_at: string,
    updated_at: string,
}

export interface VoteResponse {
    success: boolean;       // If false, an error has occurred, and the rest of the values do not exist
    our_score?: -1 | 0 | 1; // -1 for downvote, 1 for upvote, 0 for unvote
    score?: number;         // Final score of the post
    up?: number;            // Total number of upvotes 
    down?: number;          // Total number of downvotes
}
