import { ConfigException, InvalidUserAgent } from "./components/Exception";
import Logger from "./components/Logger";
import RequestQueue from "./components/RequestQueue";
import Util from "./components/Util";
import PostEndpoint from "./endpoints/Post";
import UserEndpoint from "./endpoints/User";

export default class E621 {

    private userAgent: string;
    private defaultTimeout = 500;
    private domain = "https://e621.net";

    private authToken: AuthToken;
    private authLogin: AuthLogin;

    // Endpoint declarations
    public Posts = new PostEndpoint(this);
    public Users = new UserEndpoint(this);

    constructor(config: APIConfig) {
        if (!config) throw new ConfigException;

        this.userAgent = config.userAgent;
        if (!this.userAgent) throw new InvalidUserAgent;

        if (config.defaultTimeout)
            this.defaultTimeout = config.defaultTimeout >= 500 ? config.defaultTimeout : 500;
        if (config.domain) this.domain = config.domain;

        if (config.authToken) this.authToken = config.authToken;
        if (config.authLogin) this.authLogin = config.authLogin;

        if (config.debug) Logger.debug = true;
    }

    public authViaToken(authToken: AuthToken): void { this.authToken = authToken; }
    public authViaLogin(authLogin: AuthLogin): void { this.authLogin = authLogin; }
    public getAuthLogin(): AuthLogin { return this.authLogin; }

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
        if (!config.timeout) config.timeout = this.defaultTimeout;
        else if (config.timeout < 500) config.timeout = 500;

        // Authentication
        if (this.authLogin) {
            // TODO Check if there is a difference in auth between browser and node
            requestInfo["headers"]["Authorization"] = `Basic ${Util.btoa(this.authLogin.username + ":" + this.authLogin.apiKey)}`;
        }

        /* Compiling the data and adding it to the queue */

        let url = this.domain + "/" + endpoint;
        const queryParams = APIQuery.flatten(config.query);
        if (queryParams.length > 0) url += "?" + queryParams.join("&");

        return RequestQueue.add(url, requestInfo, config.timeout);
    }
}

interface APIConfig {
    userAgent: string;
    defaultTimeout?: number;
    domain?: string;

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
    timeout?: number,
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
