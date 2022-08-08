export default class RequestError extends Error {
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, RequestError.prototype);
    }
}

export class MalformedRequestError extends RequestError {
    public constructor(message?: string) {
        if (!message) message = "Unknown request error";
        super("MalformedConfigError: " + message);
    }

    public static Params(): MalformedRequestError {
        return new MalformedRequestError("Request parameters are malformed or missing");
    }
}