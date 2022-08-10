const E621 = require("./_tests");
require('dotenv').config()

const testIf = (condition, ...args) => condition ? test(...args) : test.skip(...args);

describe("Users", () => {

    // find()
    test("Find user (by name)", async () => {
        const result = await E621.Users.find({ name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
    });
    test("Find user (with wildcard)", async () => {
        const result = await E621.Users.find({ name: "bitWolfy*" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Find user (by email)", async () => {
        const result = await E621.Users.find({ email: "*@pm.me" });
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });
    test("Find user (by level)", async () => {
        const result = await E621.Users.find({ level: E621.Users.Level.Janitor });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(10);
        expect(result.data[0].level).toBe(E621.Users.Level.Janitor);
    });

    // get()
    test("Fetch user (by name)", async () => {
        const result = await E621.Users.get("bitWolfy");
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBe(211960);
    });
    test("Fetch user (by ID)", async () => {
        const result = await E621.Users.get(211960);
        expect(result.status.code).toBe(200);
        expect(result.data.id).toBe(211960);
    });
    test("Fetch user (wrong name)", async () => {
        const result = await E621.Users.get("a");
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });
    test("Fetch user (wrong ID)", async () => {
        const result = await E621.Users.get(-451);
        expect(result.status.code).toBe(404);
        expect(result.data).toBe(null);
    });

    // auth
    testIf((process.env.E621_USER && process.env.E621_KEY), "Authentication (success)", async () => {
        E621.login({ username: process.env.E621_USER, apiKey: process.env.E621_KEY });
        const result = await E621.Users.isAuthenticated();
        E621.logout();
        expect(result).toBe(true);
    });
    test("Authentication (failure)", async () => {
        E621.login({ username: "bitWolfy", apiKey: "qwerty123456" });
        const result = await E621.Users.isAuthenticated();
        E621.logout();
        expect(result).toBe(false);
    });
});
