const esix = require("./_tests");

describe("ForumPosts", () => {
    // find()
    test("Fetch many forum posts", async () => {
        const result = await esix.ForumPosts.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch forum posts (by title)", async () => {
        const result = await esix.ForumPosts.find({ topic_title_matches: "Tag Projects" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].topic_id).toBe(23571);
    });
    test("Fetch forum posts (by body)", async () => {
        const result = await esix.ForumPosts.find({ body_matches: "Common species among this tag" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].topic_id).toBe(23571);
    });
    test("Fetch forum posts (by creator)", async () => {
        const result = await esix.ForumPosts.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch forum posts (by category)", async () => {
        const result = await esix.ForumPosts.find({ topic_category_id: esix.ForumPosts.ForumCategory.AIBUR });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });

});