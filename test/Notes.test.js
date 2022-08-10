const E621 = require("./_tests");

describe("Notes", () => {
    // find()
    test("Fetch many notes", async () => {
        const result = await E621.Notes.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch notes (by body)", async () => {
        const result = await E621.Notes.find({ body: "buckwheat" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
    });
    test("Fetch notes (by creator name)", async () => {
        const result = await E621.Notes.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        expect(result.data[0].creator_name).toBe("bitWolfy");
    });
    test("Fetch notes (by post tags)", async () => {
        const result = await E621.Notes.find({ post_tags: "text" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch notes (by ID)", async () => {
        const result = await E621.Notes.find({ id: 12345 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(12345);
    });
    test("Fetch notes (by creator ID)", async () => {
        const result = await E621.Notes.find({ creator_id: 211960 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch notes (by post ID)", async () => {
        const result = await E621.Notes.find({ post_id: 2897018 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        expect(result.data[0].post_id).toBe(2897018);
    });

});