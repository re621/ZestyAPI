const esix = require("./_tests");

describe("PostSets", () => {
    // find()
    test("Fetch many sets", async () => {
        const result = await esix.PostSets.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch sets (by name)", async () => {
        const result = await esix.PostSets.find({ name: "Wolfy's Bits", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(22224);
    });
    test("Fetch sets (by shortname)", async () => {
        // cspell: disable-next-line
        const result = await esix.PostSets.find({ shortname: "wolfybits", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(22224);
    });
    test("Fetch sets (by creator name)", async () => {
        const result = await esix.PostSets.find({ creator_name: "bitWolfy", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch sets (is_public)", async () => {
        const result = await esix.PostSets.find({ is_public: false });
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });
    test("Fetch sets (by ID)", async () => {
        const result = await esix.PostSets.find({ id: "22224" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(22224);
    });
});