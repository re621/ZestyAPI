import Endpoint from "../components/Endpoint";
import E621 from "../E621";

export default class UserEndpoint extends Endpoint {
    
    constructor(api: E621) {
        super(api);
    }
    
    public getByUsername(username: string): any {
        if(typeof username != "string") return Promise.resolve(null);
        return this.get(username);
    }
    
    public getByID(id: number): any {
        if(typeof id != "number" || !Number.isInteger(id)) return Promise.resolve(null);
        return this.get(id);
    }
    
    public get(id: string | number): any {
        if(typeof id == "object" || typeof id == "undefined") return Promise.resolve(null);
        
        return this.api.makeRequest(`users/${id}.json`).then(
            (data) => {
                if(!data.name || data.success == false) return null;
                return data;
            },
            (error) => { throw error; }
        );
    }
    
    public isAuthenticated(): Promise<boolean> {
        const auth = this.api.getAuthLogin();
        if(!auth || !auth.apiKey || !auth.username) return Promise.resolve(false);
        
        return this.api.makeRequest(`users/${auth.username}.json`).then(
            (data) => {
                if(!data.name || data.success == false) return false;
                return typeof data.email !== "undefined";
            },
            (error) => { return false; }
        );
    }
    
}
