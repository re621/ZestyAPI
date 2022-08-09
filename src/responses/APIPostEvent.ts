import { APIResponse } from "./APIResponse";

export interface APIPostEvent extends APIResponse {
    id: number,
    creator_id: number,
    post_id: number,
    action: string,
    created_at: Date,
}

export enum APIPostEventAction {
    Deleted = "deleted",
    Undeleted = "undeleted",
    Approved = "approved",
    Unapproved = "unapproved",
    FlagCreated = "flag_created",
    FlagRemoved = "flag_removed",
    FavoritesMoved = "favorites_moved",
    FavoritesReceived = "favorites_received",
    RatingLocked = "rating_locked",
    RatingUnlocked = "rating_unlocked",
    StatusLocked = "status_locked",
    StatusUnlocked = "status_unlocked",
    NoteLocked = "note_locked",
    NoteUnlocked = "note_unlocked",
    CommentsDisabled = "comment_disabled",
    CommentsEnabled = "comment_enabled",
    ReplacementAccepted = "replacement_accepted",
    ReplacementDeleted = "replacement_deleted",
    Expunged = "expunged",
}