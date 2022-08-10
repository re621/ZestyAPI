const E621 = require("./_tests");

describe("ForumTopics", () => {
    // find()
    test("Fetch many forum topics", async () => {
        const result = await E621.ForumTopics.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(40);
    });
    test("Fetch forum topics (by title)", async () => {
        const result = await E621.ForumTopics.find({ title: "Tag Projects" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch forum topics (sticky)", async () => {
        const result = await E621.ForumTopics.find({ is_sticky: true });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch forum topics (by category)", async () => {
        const result = await E621.ForumTopics.find({ category_id: E621.ForumTopics.Category.AIBUR });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(40);
        expect(result.data[0].category_id = E621.ForumTopics.Category.AIBUR)
    });

});
