export class ConfigException extends Error {
    
    constructor() {
        super("E621.MalformedConfig: API configuration is corrupted or missing");
    }
}

export class InvalidUserAgent extends Error {
    
    constructor() {
        super("E621.MalformedUserAgent: User-Agent either missing or invalid");
    }
}
