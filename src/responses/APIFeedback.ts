import APIResponse from "./APIResponse";

export default interface APIFeedback extends APIResponse {
    id: number;
    user_id: number,
    creator_id: number,
    body: string,
    category: APIFeedbackCategory,
    created_at: Date,
    updated_at: Date,
}

export enum APIFeedbackCategory {
    Positive = "positive",
    Neutral = "neutral",
    Negative = "negative",
}