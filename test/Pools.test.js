const esix = require("./_tests");

describe("Pools", () => {
    // find()
    test("Fetch many pools", async () => {
        const result = await esix.Pools.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch pools (by name)", async () => {
        const result = await esix.Pools.find({ name_matches: "silver soul", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].id).toBe(11563);
    });
    test("Fetch pools (by description)", async () => {
        const result = await esix.Pools.find({ description_matches: "Silver Soul", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].id).toBe(11563);
    });
    test("Fetch pools (by creator name)", async () => {
        const result = await esix.Pools.find({ creator_name: "Cat-in-Flight", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(141228);
    });
    test("Fetch pools (active)", async () => {
        const result = await esix.Pools.find({ is_active: false });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].is_active).toBe(false);
    });
});