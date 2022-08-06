import Logger from "./components/Logger";
import RequestQueue from "./components/RequestQueue";
import Util from "./components/Util";
import PostEndpoint from "./endpoints/Post";
import UserEndpoint from "./endpoints/User";
import { MalformedConfigError } from "./error/InitializationError";

export default class E621 {

    private static instance: E621;

    private userAgent: string;
    private rateLimit: number;
    private domain: string;

    private authToken: AuthToken;
    private authLogin: AuthLogin;

    // Endpoint declarations
    public Posts = new PostEndpoint(this);
    public Users = new UserEndpoint(this);

    private constructor(config: APIConfig) {
        // User Agent
        if (!config.userAgent || typeof config.userAgent !== "string" || config.userAgent.length > 250)
            throw MalformedConfigError.UserAgent();
        else this.userAgent = config.userAgent;

        // Rate Limit
        if (!config.rateLimit || typeof config.rateLimit !== "number" || config.rateLimit < 500)
            this.rateLimit == 500;
        else this.rateLimit = config.rateLimit;

        // Domain
        if (!config.domain) config.domain = "https://e621.net";
        else if (typeof config.domain !== "string")
            throw MalformedConfigError.Domain();
        try { this.domain = new URL(config.domain).href; }
        catch { throw MalformedConfigError.Domain(); }

        // Authentication
        // TODO Authenticate AFTER the connection is initialized
        if (config.authToken) {
            if (typeof config.authToken !== "string" || config.authToken.length > 250)
                throw MalformedConfigError.Auth();
            else this.authToken = config.authToken;
        }
        else if (config.authLogin) {
            if (!config.authLogin.username || typeof config.authLogin.username !== "string" || config.authLogin.username.length > 250
                || !config.authLogin.apiKey || typeof config.authLogin.apiKey !== "string" || config.authLogin.apiKey.length > 250)
                throw MalformedConfigError.Auth();
            else this.authLogin = config.authLogin;
        }

        // Debug
        if (config.debug) Logger.debug = true;
    }

    public static connect(config?: APIConfig): E621 {
        if (!this.instance) this.instance = new E621(config);
        return this.instance;
    }

    public makeRequest(endpoint: string, config?: RequestConfig): Promise<any> {

        const requestInfo = {};
        requestInfo["headers"] = {};

        /* Validating the request config */
        if (!config) config = {};

        // Request method
        if (!config.method) config.method = "GET";
        requestInfo["method"] = config.method;

        // Query parameters and headers
        if (!config.query) config.query = {};
        if (Util.isBrowser) config.query["_client"] = encodeURIComponent(this.userAgent);
        else {
            requestInfo["headers"]["User-Agent"] = this.userAgent;
            requestInfo["headers"]["X-User-Agent"] = this.userAgent;
        }

        // Request body
        if (!config.body) config.body = {};
        if (config.method !== "GET") {
            if (this.authToken) config.body["authenticity_token"] = encodeURIComponent(this.authToken);
            const bodyParams = APIQuery.flatten(config.body);
            if (bodyParams.length > 0)
                requestInfo["body"] = bodyParams.join("&");
        }

        // Timeout
        if (!config.rateLimit) config.rateLimit = this.rateLimit;
        else if (config.rateLimit < 500) config.rateLimit = 500;

        // Authentication
        if (this.authLogin) {
            // TODO Check if there is a difference in auth between browser and node
            requestInfo["headers"]["Authorization"] = `Basic ${Util.btoa(this.authLogin.username + ":" + this.authLogin.apiKey)}`;
        }

        /* Compiling the data and adding it to the queue */

        let url = this.domain + endpoint;
        const queryParams = APIQuery.flatten(config.query);
        if (queryParams.length > 0) url += "?" + queryParams.join("&");

        return RequestQueue.add(url, requestInfo, config.rateLimit);

    }

}

if (typeof process === "undefined")
    (window as any).E621 = E621;

interface APIConfig {
    userAgent: string,
    rateLimit: 500 | number,
    domain: "https://e621.net" | "https://e926.net" | string,

    authToken?: AuthToken;
    authLogin?: AuthLogin

    debug?: boolean;
}

type AuthToken = string;
interface AuthLogin {
    username: string;
    apiKey: string;
}

interface RequestConfig {
    method?: "GET" | "POST",
    query?: APIQuery,
    body?: APIQuery,
    rateLimit?: number,
}

export interface APIQuery {
    [prop: string]: string;
}
namespace APIQuery {
    export function flatten(input: APIQuery): string[] {
        const result = [];
        for (const [key, value] of Object.entries(input)) {
            if (value == null || value == undefined) continue;
            result.push(key + "=" + value);
        }
        return result;
    }
}
