const E621 = require("./_tests");

describe("ForumPosts", () => {
    // find()
    test("Fetch many forum posts", async () => {
        const result = await E621.ForumPosts.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch forum posts (by title)", async () => {
        const result = await E621.ForumPosts.find({ title: "Tag Projects" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].topic_id).toBe(23571);
    });
    test("Fetch forum posts (by body)", async () => {
        const result = await E621.ForumPosts.find({ body: "Common species among this tag" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].topic_id).toBe(23571);
    });
    test("Fetch forum posts (by creator)", async () => {
        const result = await E621.ForumPosts.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch forum posts (by category)", async () => {
        const result = await E621.ForumPosts.find({ category_id: E621.ForumPosts.Category.AIBUR });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch forum posts (by ID)", async () => {
        const result = await E621.ForumPosts.find({ id: 12345 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(12345);
    });
    test("Fetch forum posts (by creator ID)", async () => {
        const result = await E621.ForumPosts.find({ creator_id: 211960 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch forum posts (by topic ID)", async () => {
        const result = await E621.ForumPosts.find({ topic_id: 12345 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        expect(result.data[0].topic_id).toBe(12345);
    });
    test("Fetch forum posts (hidden)", async () => {
        const result = await E621.ForumPosts.find({ is_hidden: true });
        expect(result.status.code).toBe(404); // BUG This SHOULD return 403, but it doesn't.
        expect(result.data.length).toBe(0);
    });
    test("Fetch forum posts (404)", async () => {
        const result = await E621.ForumPosts.find({ title: "This Thread Does Not Exist" });
        expect(result.status.code).toBe(404);
        expect(result.data.length).toBe(0);
    });
});
