const E621 = require("./_tests");

describe("Pools", () => {
    // find()
    test("Fetch many pools", async () => {
        const result = await E621.Pools.find();
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
    });
    test("Fetch pools (by name)", async () => {
        const result = await E621.Pools.find({ name: "silver soul", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].id).toBe(11563);
    });
    test("Fetch pools (by description)", async () => {
        const result = await E621.Pools.find({ description: "Silver Soul", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].id).toBe(11563);
    });
    test("Fetch pools (by creator name)", async () => {
        const result = await E621.Pools.find({ creator_name: "Cat-in-Flight", order: "post_count" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(141228);
    });
    test("Fetch pools (active)", async () => {
        const result = await E621.Pools.find({ is_active: false });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].is_active).toBe(false);
    });
    test("Fetch pools (by ID)", async () => {
        const result = await E621.Pools.find({ id: 12345 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
        expect(result.data[0].id).toBe(12345);
    });
    test("Fetch pools (by creator ID)", async () => {
        const result = await E621.Pools.find({ creator_id: 211960 });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.data[0].creator_id).toBe(211960);
    });
    test("Fetch pools (by category)", async () => {
        const result = await E621.Pools.find({ category: E621.Pools.Category.Series });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(75);
        expect(result.data[0].category).toBe(E621.Pools.Category.Series);
    });
    test("Fetch pools (404)", async () => {
        const result = await E621.Pools.find({ creator_name: "abcdefg" });
        expect(result.status.code).toBe(404);
        expect(result.data.length).toBe(0);
    });
});
