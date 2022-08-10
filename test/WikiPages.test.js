const E621 = require("./_tests");

describe("WikiPages", () => {
    // find()
    test("Fetch many pages", async () => {
        const result = await E621.WikiPages.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch pages (by title)", async () => {
        const result = await E621.WikiPages.find({ title: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
    });
    test("Fetch pages (body matches)", async () => {
        const result = await E621.WikiPages.find({ body: "mammal" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch pages (by creator name)", async () => {
        const result = await E621.WikiPages.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch pages (ordered)", async () => {
        const result = await E621.WikiPages.find({ order: "title" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
});