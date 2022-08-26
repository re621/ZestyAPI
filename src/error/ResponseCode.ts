export enum ResponseCode {
    ParsingError = 490,
    MalformedRequest = 491,
    FetchError = 492,

    Success = 200,
    Unauthorized = 401,
    NotFound = 404,
}

export enum ResponseStatusMessage {
    MalformedRequest = "malformed request",
    NotFound = "not found",
    ProcessingError = "data processing error",
    Unauthorized = "unauthorized",
}
