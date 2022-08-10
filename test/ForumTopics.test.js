const esix = require("./_tests");

describe("ForumTopics", () => {
    // find()
    test("Fetch many forum topics", async () => {
        const result = await esix.ForumTopics.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(40);
    });
    test("Fetch forum topics (by title)", async () => {
        const result = await esix.ForumTopics.find({ title: "Tag Projects" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch forum topics (sticky)", async () => {
        const result = await esix.ForumTopics.find({ is_sticky: true });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch forum topics (by category)", async () => {
        const result = await esix.ForumTopics.find({ category_id: esix.ForumTopics.Category.AIBUR });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(40);
        expect(result.data[0].category_id = esix.ForumTopics.Category.AIBUR)
    });

});
