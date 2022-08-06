
export default class InitializationError extends Error {
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InitializationError.prototype);
    }
}

export class MalformedConfigError extends InitializationError {
    public constructor(message?: string) {
        if (!message) message = "Unknown configuration error";
        super("MalformedConfigError: " + message);
    }

    public static UserAgent(): MalformedConfigError {
        return new MalformedConfigError("UserAgent missing or malformed");
    }

    public static Domain(): MalformedConfigError {
        return new MalformedConfigError("Domain name missing or malformed");
    }

    public static Auth(): MalformedConfigError {
        return new MalformedConfigError("Authentication parameters malformed");
    }
}
