import APIResponse from "./APIResponse";

export default interface APIUser extends APIResponse {
    id: number;
    created_at: string;
    name: string;
    level: APIUserLevel;
    base_upload_limit: number;
    post_upload_count: number;
    post_update_count: number;
    note_update_count: number;
    is_banned: boolean;
    can_approve_posts: boolean;
    can_upload_free: boolean;
    level_string: string;
}

export interface APICurrentUser extends APIUser {
    id: number;
    wiki_page_version_count: number;
    artist_version_count: number;
    pool_version_count: number;
    forum_post_count: number;
    comment_count: number;
    appeal_count: number;
    flag_count: number;
    positive_feedback_count: number;
    neutral_feedback_count: number;
    negative_feedback_count: number;
    upload_limit: number;
    show_avatars: boolean;
    blacklist_avatars: boolean;
    blacklist_users: boolean;
    description_collapsed_initially: boolean;
    hide_comments: boolean;
    show_hidden_comments: boolean;
    show_post_statistics: boolean;
    has_mail: boolean;
    receive_email_notifications: boolean;
    enable_keyboard_navigation: boolean;
    enable_privacy_mode: boolean;
    style_usernames: boolean;
    enable_auto_complete: boolean;
    has_saved_searches: boolean;
    disable_cropped_thumbnails: boolean;
    disable_mobile_gestures: boolean;
    enable_safe_mode: boolean;
    disable_responsive_mode: boolean;
    disable_post_tooltips: boolean;
    no_flagging: boolean;
    no_feedback: boolean;
    disable_user_dmails: boolean;
    enable_compact_uploader: boolean;
    updated_at: Date;
    email: string;
    last_logged_in_at: Date;
    last_forum_read_at: Date;
    recent_tags: string;
    comment_threshold: number;
    default_image_size: string;
    favorite_tags: string;
    blacklisted_tags: string;
    time_zone: string;
    per_page: number;
    custom_style: string;
    favorite_count: number;
    api_regen_multiplier: number;
    api_burst_limit: number;
    remaining_api_limit: number;
    statement_timeout: number;
    favorite_limit: number;
    tag_query_limit: number;
}

export enum APIUserLevel {
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