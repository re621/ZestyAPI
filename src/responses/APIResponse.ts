/**
 * Generic response from the e621 API.  
 * Other responses should extend this for proper typecasting.  
 */
export default interface APIResponse {
    id: number;
}

export interface APIWarnedMessage {
    warning_type: MessageWarningType | null;
    warning_user_id: number | null
}

export enum MessageWarningType {
    Warning = 0,
    Record = 1,
    Ban = 2,
}
