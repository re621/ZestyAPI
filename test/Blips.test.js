const esix = require("./_tests");

describe("Blips", () => {
    // find()
    test("Fetch many blips", async () => {
        const result = await esix.Blips.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch blips (by name)", async () => {
        const result = await esix.Blips.find({ creator_name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch blips (by contents)", async () => {
        const result = await esix.Blips.find({ body_matches: "@bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Fetch blips (by response ID)", async () => {
        const result = await esix.Blips.find({ response_to: 113349 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThanOrEqual(1);
    });
    test("Fetch blips (reordered)", async () => {
        const result = await esix.Blips.find({ order: "id_desc" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });

});