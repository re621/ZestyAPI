const E621 = require("./_tests");

describe("Utility", () => {

    test("E621 online", async () => {
        const result = await E621.Utility.isOnline();
        expect(result).toBe(true);
    });

    test("Returns error 403", async () => {
        const result = await E621.Utility.test403();
        expect(result.status.code).toBe(403);
        expect(result.data.length).toBe(0);
    });

    test("Returns error 404", async () => {
        const result = await E621.Utility.test404();
        expect(result.status.code).toBe(404);
        expect(result.data.length).toBe(0);
    });

});