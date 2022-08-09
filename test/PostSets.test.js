const esix = require("./_tests");

describe("PostSets", () => {
    // find()
    test("Fetch many sets", async () => {
        const result = await esix.PostSets.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch sets (by name)", async () => {
        const result = await esix.PostSets.find({ name: "Official Cute Set", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(12422);
    });
    test("Fetch sets (by shortname)", async () => {
        const result = await esix.PostSets.find({ shortname: "ofc", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(12422);
    });
    test("Fetch sets (by creator name)", async () => {
        const result = await esix.PostSets.find({ creator_name: "NotMeNotYou", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(17633);
    });
});