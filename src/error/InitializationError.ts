export default class InitializationError extends Error {
    public constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InitializationError.prototype);
    }

    public static UserAgent(): InitializationError {
        return new InitializationError("UserAgent missing or malformed");
    }

    public static Domain(): InitializationError {
        return new InitializationError("Domain name missing or malformed");
    }

    public static Auth(): InitializationError {
        return new InitializationError("Authentication parameters malformed");
    }
}
