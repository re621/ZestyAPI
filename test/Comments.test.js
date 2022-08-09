const esix = require("./_tests");

describe("Comments", () => {
    // find()
    test("Fetch many comments", async () => {
        const result = await esix.Comments.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch comments (by creator name)", async () => {
        const result = await esix.Comments.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch comments (by body match)", async () => {
        const result = await esix.Comments.find({ body_matches: "permanent" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch comments (by tag match)", async () => {
        const result = await esix.Comments.find({ post_tags_match: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch comments (sticky)", async () => {
        const result = await esix.Comments.find({ is_sticky: true });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].is_sticky).toBe(true);
    });
});