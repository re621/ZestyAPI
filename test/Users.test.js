const esix = require("./_tests");
require('dotenv').config()

const testIf = (condition, ...args) => condition ? test(...args) : test.skip(...args);

describe("Users", () => {

    // find()
    test("Find user (by name)", async () => {
        const result = await esix.Users.find({ name: "bitWolfy" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBe(1);
    });
    test("Find user (with wildcard)", async () => {
        const result = await esix.Users.find({ name: "bitWolfy*" });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(1);
    });
    test("Find user (by email)", async () => {
        const result = await esix.Users.find({ email: "*@pm.me" });
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });
    test("Find user (by level)", async () => {
        const result = await esix.Users.find({ level: esix.Users.Level.Janitor });
        expect(result.status.code).toBe(200);
        expect(result.data.length).toBeGreaterThan(10);
        expect(result.data[0].level).toBe(esix.Users.Level.Janitor);
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

    // auth
    testIf((process.env.ESIX_USER && process.env.ESIX_KEY), "Authentication (success)", async () => {
        esix.login({ username: process.env.ESIX_USER, apiKey: process.env.ESIX_KEY });
        const result = await esix.Users.isAuthenticated();
        esix.logout();
        expect(result).toBe(true);
    });
    test("Authentication (failure)", async () => {
        esix.login({ username: "bitWolfy", apiKey: "qwerty123456" });
        const result = await esix.Users.isAuthenticated();
        esix.logout();
        expect(result).toBe(false);
    });
});
