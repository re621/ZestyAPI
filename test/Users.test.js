const esix = require("./_tests");

describe("Users", () => {

    // find()
    test("Find user (by name)", async () => {
        const result = await esix.Users.find({ name_matches: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
    });
    test("Find user (with wildcard)", async () => {
        const result = await esix.Users.find({ name_matches: "bitWolfy*" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Find user (by email)", async () => {
        const result = await esix.Users.find({ email_matches: "*@pm.me" });
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });
    test("Find user (by level)", async () => {
        const result = await esix.Users.find({ level: esix.Users.UserLevel.Janitor });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(10);
    });

    // get()
    test("Fetch user (by name)", async () => {
        const result = await esix.Users.get("bitWolfy");
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBe(211960);
    });
    test("Fetch user (by ID)", async () => {
        const result = await esix.Users.get(211960);
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBe(211960);
    });
    test("Fetch user (wrong name)", async () => {
        const result = await esix.Users.get("a");
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });
    test("Fetch user (wrong ID)", async () => {
        const result = await esix.Users.get(-451);
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });
});
