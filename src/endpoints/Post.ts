import Endpoint from "../components/Endpoint";
import Util from "../components/Util";
import E621 from "../E621";
import { APIPost } from "../responses/APIPost";

export default class PostEndpoint extends Endpoint {

    public constructor(api: E621) {
        super(api);
    }

    public find(tags?: string | string[], limit?: number): Promise<any> {
        if (typeof tags == "string")
            tags = tags.trim().split(" ").filter(n => n);
        else if (tags == null || typeof tags == "undefined") tags = [];
        else if (typeof tags !== "object") tags = [tags + ""];
        else if (!Array.isArray(tags)) return Promise.resolve([]); // TODO Standardize error output

        return this.api.makeRequest("posts.json", { query: { tags: Util.encodeArray(tags).join("+"), limit: limit ? limit : undefined } })
            .then(
                (data) => {
                    return data.posts ? data.posts : [];
                },
                (error) => { throw error; }
            );
    }

    public get(id: number): Promise<APIPost> {
        if (typeof id != "number") return Promise.resolve(null);

        return this.api.makeRequest(`posts/${id}.json`)
            .then(
                (data) => {
                    if (!data.post || data.success == false) return null;
                    return data.post;
                },
                (error) => { throw error; }
            )
    }

    public edit(id: number, postData: any): Promise<APIPost> {
        return null;
    }
}
